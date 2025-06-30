'use client'

import {Id} from "@/convex/_generated/dataModel";
import {useRouter} from "next/navigation";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import {useUser} from "@clerk/nextjs";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {MoreHorizontal, Trash} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";

interface MenuProps{
	docId: Id<'documents'>
}

export default function Menu({docId}: MenuProps){
	const router = useRouter()
	const { user } = useUser()
	const archive = useMutation(api.documents.archive)

	const onArchive = () => {
		const promise = archive({id:docId})

		toast.promise(promise, {
			loading: 'Sedang mengarsipkan catatan...',
			success: 'Yay... berhasil mengarsipkan catatan!',
			error: 'Ops... gagal mengarsipkan catatan :('
		})

		router.push('/app')
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size='sm' variant='ghost'>
					<MoreHorizontal  className='h-4 w-4'/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-60"
				align='end'
				alignOffset={8}
				forceMount
			>
			<DropdownMenuItem onClick={onArchive}>
				<Trash className="w-4 h-4 mr-2"/>
				Hapus
			</DropdownMenuItem>
				<DropdownMenuSeparator/>
				<div className="p-2 text-xs text-muted-foreground">terakhir diedit oleh: {user?.fullName}</div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

Menu.Skeleton = function MenuSkeleton() {
	return (
		<Skeleton className="h-7 w-7 rounded-md"/>
	)
}