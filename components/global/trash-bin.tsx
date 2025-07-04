'use client'

import {useMutation, useQuery} from "convex/react";
import {useParams, useRouter} from "next/navigation";
import {api} from "@/convex/_generated/api";
import React, {useState} from "react";
import {Id} from "@/convex/_generated/dataModel";
import {toast} from "sonner";
import Spinner from "@/components/ui/spinner";
import {Search, Trash, Undo} from "lucide-react";
import {Input} from "@/components/ui/input";
import ConfirmModal from "@/components/modal/confirm-modal";

export default function TrashBin(){
	const router = useRouter();
	const params = useParams();

	const documents = useQuery(api.documents.getTrash)
	const restore = useMutation(api.documents.restore)
	const remove = useMutation(api.documents.remove)

	const [search, setSearch] = useState("")

	const filteredDoc = documents?.filter(doc => {
		return doc.title.toLowerCase().includes(search.toLowerCase())
	})

	const onClick = (docId: string) => {
		router.push(`/app/${docId}`)
	}

	const onRestore = (e: React.MouseEvent<HTMLDivElement,MouseEvent>, docId: Id<'documents'>) => {
		e.preventDefault();
		e.stopPropagation();

		const promise = restore({id: docId})

		toast.promise(promise,{
			loading: 'Sedang memulihkan catatan...',
			success: 'Yay... berhasil memulihkan catatan!',
			error: 'Ops... gagal memulihkan catatan :('
		})
	}

	const onRemove = (docId: Id<'documents'>) => {
		const promise = remove({id: docId})

		toast.promise(promise,{
			loading: 'Sedang menghapus catatan...',
			success: 'Yay... berhasil menghapus catatan!',
			error: 'Ops... gagal menghapus catatan :('
		})

		if(params.docId === docId){
			router.push('/app')
		}
	}

	if(documents === undefined){
		return (
			<div className="h-full flex items-center justify-center p-4">
				<Spinner size='lg'/>
			</div>
		)
	}

	return (
		<div className="text-sm">
			<div className="flex items-center gap-x-1 p-2">
				<Search className="h-4 w-4"/>
				<Input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="h-7 px-7 focus-visible:ring-transparent bg-secondary"
					placeholder={"cari catatan"}
				/>
			</div>
			<div className="mt-2 px-1 pb-1">
				<p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
					Catatan tidak ditemukan.
				</p>
				{filteredDoc?.map((doc) => (
					<div
						key={doc._id}
						role="button"
						onClick={() => onClick(doc._id)}
						className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center justify-between text-primary"
					>
						<span className="truncate pl-2">{doc.title}</span>
						<div className="flex items-center">
							<div
								className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
								role="button"
								onClick={(e) => onRestore(e,doc._id)}
							>
								<Undo className="h-4 w-4 text-muted-foreground"/>
							</div>
							<ConfirmModal onConfirmAction={() => onRemove(doc._id)}>
								<div
									className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
									role="button"
								>
									<Trash className="h-4 w-4 text-muted-foreground"/>
								</div>
							</ConfirmModal>
						</div>
					</div>
				))}
			</div>

		</div>
	)
}