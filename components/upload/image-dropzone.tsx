'use client'

import {FileRejection, useDropzone} from "react-dropzone";
import {useCallback, useState} from "react";
import {authenticator, cn} from "@/lib/utils";
import {toast} from "sonner";
import {UploadCloudIcon} from "lucide-react";
import * as React from "react";
import {ProgressCircle} from "@/components/ui/progress-circle";
import {
	ImageKitAbortError,
	ImageKitInvalidRequestError,
	ImageKitServerError,
	ImageKitUploadNetworkError,
	upload
} from "@imagekit/next";
import {useImageCover} from "@/hooks/use-image-cover";
import {useParams} from "next/navigation";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {Id} from "@/convex/_generated/dataModel";
import Image from "next/image";
import {useOrigin} from "@/hooks/use-origin";

export default function ImageDropzone() 	{
	const origin = useOrigin()
	const imageCover = useImageCover()
	const params = useParams()
	const update = useMutation(api.documents.update)

	const [file, setFile] = useState<File>();
	const [progress, setProgress] = useState(0);
	const [imagePreview, setImagePreview] = useState({display: false, url: ''});
	const [isUploading, setIsUploading] = useState(false);
	// const abortController = new AbortController();

	const handleUpload = async (file: File) => {
		if(!file) return;
		// Retrieve authentication parameters for the upload.
		let authParams;
		try {
			authParams = await authenticator(origin);
		} catch (authError) {
			console.error("Failed to authenticate for upload:", authError);
			return;
		}
		const { signature, expire, token, publicKey } = authParams;

		// Call the ImageKit SDK upload function with the required parameters and callbacks.

		try {
			const uploadResponse = await upload({
				// Authentication parameters
				expire,
				token,
				signature,
				publicKey,
				file,
				folder: '/Lotion',
				fileName: file.name, // Optionally set a custom file name
				// Progress callback to update upload progress state
				onProgress: (event) => {
					setProgress((event.loaded / event.total) * 100);
				},
				// Abort signal to allow cancellation of the upload if needed.
				// abortSignal: abortController.signal,
			});

			await update({
				id: params.docId as Id<'documents'>,
				coverImage: uploadResponse.filePath
			})

		} catch (error) {
			// Handle specific error types provided by the ImageKit SDK.
			if (error instanceof ImageKitAbortError) {
				console.error("Upload aborted:", error.reason);
			} else if (error instanceof ImageKitInvalidRequestError) {
				console.error("Invalid request:", error.message);
			} else if (error instanceof ImageKitUploadNetworkError) {
				console.error("Network error:", error.message);
			} else if (error instanceof ImageKitServerError) {
				console.error("Server error:", error.message);
			} else {
				// Handle any other errors that may occur.
				console.error("Upload error:", error);
			}
		}
	}

	const onChange = async (file: File) => {
		if(file){
			setFile(file);
			setImagePreview({
				display: true,
				url: URL.createObjectURL(file)
			})
			setIsUploading(true);
		}
	}

	const onDrop = useCallback((acceptedFiles: File[]) => {
		// Do something with the files
		if(acceptedFiles.length > 0){
			onChange(acceptedFiles[0]).then(() => {
				const promises = handleUpload(acceptedFiles[0]).then(() => {
					setFile(undefined);
					setTimeout(() => {
						setIsUploading(false);
						setImagePreview({
							display: false,
							url: ''
						})
						imageCover.onClose()
					}, 1000);

				})

				toast.promise(promises,{
					loading:"Tunggu... gambar sedang di upload...",
					success:"Yay... berhasil menambah gambar cover",
					error:"Yah... sepertinya ada masalah",
				})
			})
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imageCover])

	const onDropRejected = useCallback((rejectedFiles: FileRejection[]) => {
		// Do something with the files
		if(rejectedFiles.length > 0){
			const tooManyFiles = rejectedFiles.find(
				(res) => res.errors[0].code === 'too-many-files')

			const tooLarge = rejectedFiles.find(
				(res) => res.errors[0].code === 'file-too-large');

			if(tooLarge){
				toast.error('File terlalu besar, maksimal 5MB.')
			}

			if(tooManyFiles){
				toast.error('Pilih 1 gambar saja.')
			}
		}
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		onDropRejected,
		multiple: false,
		maxFiles: 1,
		maxSize: 1024 * 1024 * 5,
		accept: { "image/*": [] },
	})

	return (
		<>
				<div className="relative" {...getRootProps()}>

					{imagePreview.display ? (
						<Image
							className="h-full w-full rounded-md object-cover"
							src={imagePreview.url}
							alt={file?.name ?? 'uploaded image'}
							width={400}
							height={400}
						/>
					) : (
						// Placeholder content shown when no image is selected
						<div
							className={cn(
								'rounded-md p-4 flex justify-center items-center flex-col cursor-pointer min-h-[150px] w-full border-2 border-dashed border-muted-foreground dark:border-slate-600 transition-colors duration-200 ease-in-out text-xs text-muted-foreground',
								isDragActive && 'border-blue-500 dark:border-blue-400'
							)}
						>
							<input {...getInputProps()} />
							<UploadCloudIcon className="mb-1 h-7 w-7" />
							<div className="font-medium">
								{
									isDragActive ?
										<p>Taruh disini ...</p> :
										<p>Seret gambar kesini, atau klik untuk memilih</p>
								}
							</div>
							<div className="text-xs">Max size: 5MB</div>
						</div>
					)}

					{/* Upload progress overlay */}
					{imagePreview.display && isUploading && (
						<div className="absolute inset-0 flex flex-col items-center justify-center rounded-md bg-black/70">
							<ProgressCircle progress={progress} />
						</div>
					)}

					<div/>
				</div>

		</>
	)
}