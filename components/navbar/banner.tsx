'use client'

import {Id} from "@/convex/_generated/dataModel";
import {useRouter} from "next/navigation";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import ConfirmModal from "@/components/modal/confirm-modal";

interface BannerProps{
	docId: Id<'documents'>
}

export default function Banner({docId}: BannerProps){
	const router = useRouter()
	const remove = useMutation(api.documents.remove)
	const restore = useMutation(api.documents.restore)

	const onRemove = () => {
		const promise = remove({id:docId})

		toast.promise(promise, {
			loading: 'Sedang menghapus catatan...',
			success: 'Yay... berhasil menghapus catatan!',
			error: 'Ops... gagal menghapus catatan :('
		})

		router.push('/app')
	}

	const onRestore = () => {
		const promise = restore({id:docId})

		toast.promise(promise, {
			loading: 'Sedang merestore catatan...',
			success: 'Yay... berhasil merestore catatan!',
			error: 'Ops... gagal merestore catatan :('
		})
	}

	return (
		<div className="w-full bg-rose-500 text-center text-sm p-2 flex items-center justify-center gap-x-2 text-white">
			<p>Catatan kamu ada di sampah.</p>
			<Button
				size="sm"
				onClick={onRestore}
				variant="outline"
				className="bg-transparent border-white hover:bg-primary/5 text-white hover:text-white py-1 px-2 h-auto font-normal"
			>
				Restore sekarang
			</Button>
			<ConfirmModal onConfirmAction={onRemove}>
				<Button
					size="sm"
					variant="outline"
					className="bg-transparent border-white hover:bg-primary/5 text-white hover:text-white py-1 px-2 h-auto font-normal"
				>
					Hapus permanen
				</Button>
			</ConfirmModal>
		</div>
	)
}