'use client'

import {useImageCover} from "@/hooks/use-image-cover";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import ImageDropzone from "@/components/upload/image-dropzone";


export default function ImageUploadModal() {
	const imageCover = useImageCover()

	return (
		<Dialog open={imageCover.isOpen} onOpenChange={imageCover.onClose}>
			<DialogContent>
				<DialogHeader className="border-b pb-3">
					<DialogTitle className="text-lg font-semibold text-center">
					Upload Gambar
					</DialogTitle>
				</DialogHeader>
					<div className="flex flex-col gap-y-1 w-full">
						<ImageDropzone />
					</div>
			</DialogContent>
		</Dialog>
	)
}