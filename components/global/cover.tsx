'use client'

import {cn} from "@/lib/utils";
import {Image} from "@imagekit/next";
import {Button} from "@/components/ui/button";
import {ImageIcon, X} from "lucide-react";
import {useImageCover} from "@/hooks/use-image-cover";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useParams} from "next/navigation";
import {Id} from "@/convex/_generated/dataModel";
import {toast} from "sonner";
import {Skeleton} from "@/components/ui/skeleton";

interface CoverProps {
	path?: string
	preview?: boolean
}

export default function Cover({path, preview}: CoverProps){
	const params = useParams()
	const imageCover = useImageCover()
	const removeCover = useMutation(api.documents.removeCover)

	const onRemove = () => {
		const promises = removeCover({id:params.docId as Id<'documents'>})
		toast.promise(promises,{
			success:'Cover dihapus...',
			error: 'Sepertinya ada masalah...'
		})
	}
	return (
		<div className={cn(
			'relative w-full h-[35vh] group',
			!path && 'h-[12vh]',
			path && 'bg-muted'
		)}>
			{!!path && (
				<Image alt="cover" src={path} fill className="object-cover" />
			)}

			{!!path && !preview && (
				<div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
					<Button
						onClick={imageCover.onOpen}
						className="text-xs text-muted-foreground"
						variant="outline"
						size="sm"
					>
						<ImageIcon className="w-4 h-4"/>
						Ganti cover
					</Button>
					<Button
						onClick={onRemove}
						className="text-xs text-muted-foreground"
						variant="outline"
						size="sm"
					>
						<X className="w-4 h-4"/>
						Hapus cover
					</Button>
				</div>
			)}

		</div>
	)
}

Cover.Skeleton = function CoverSkeleton() {
	return(
		<Skeleton className='w-full h-[12vh]'/>
	)
}