'use client'
import Image from "next/image";
import {useUser} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export default function AppPage(){
	const {user} = useUser()
	const router = useRouter()
	const create = useMutation(api.documents.create)

	const onCreate = () => {
		const promise = create({title: 'Untitled'})
			.then(docId => router.push(`/app/${docId}`))

		toast.promise(promise, {
			loading: 'Sedang membuat catatan...',
			success: 'Yay... berhasil membuat catatan!',
			error: 'Ops... gagal membuat catatan :('
		})
	}

	return (
		<div className="h-full flex flex-col items-center justify-center space-y-4">
			<Image width={600} height={300} src="/empty.png" alt="empty" className="dark:invert" priority/>
			<h2 className="text-lg font-medium">
				Welcome to {user?.firstName}&apos;s Lotion
			</h2>
			<Button onClick={onCreate}>
				<PlusCircle/>
				Buat Catatan
			</Button>
		</div>
	)
}