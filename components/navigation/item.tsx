'use client'

import {ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash} from "lucide-react";
import {cn} from "@/lib/utils";
import {Id} from "@/convex/_generated/dataModel";
import {Skeleton} from "@/components/ui/skeleton";
import React from "react";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {useUser} from "@clerk/nextjs";

interface ItemProps {
	id?: Id<'documents'>
	docIcon?: string
	isActive?: boolean
	expanded?: boolean
	isSearch?: boolean
	level?: number
	onExpand?: () => void
	label: string
	onClickAction?: () => void
	icon: LucideIcon
	className?: string
}
export default function Item(
	{
		id,
		label,
		onClickAction,
		icon: Icon,
		isActive,
		docIcon,
		isSearch,
		level = 0,
		onExpand,
		expanded,
		className
	}: ItemProps)
{
	const {user} = useUser()
	const router = useRouter()
	const create = useMutation(api.documents.create)
	const archive = useMutation(api.documents.archive)
	const ChevronIcon = expanded ? ChevronDown : ChevronRight

	const handleExpand = (e: React.MouseEvent<HTMLDivElement,MouseEvent>) => {
		e.preventDefault();
		e.stopPropagation()
		onExpand?.()
	}

	const onCreate = (e: React.MouseEvent<HTMLDivElement,MouseEvent>) => {
		e.preventDefault()
		e.stopPropagation()
		if(!id) return;

		const promise = create({title: 'Untitled', parentDocument: id})
			.then((docId) => {
				if(!expanded){
					onExpand?.()
				}
				router.push(`/app/${docId}`)
			})

		toast.promise(promise,{
			loading: 'Sedang membuat catatan...',
			success: 'Yay... berhasil membuat catatan!',
			error: 'Ops... gagal membuat catatan :('
		})
	}

	const onArchive = (e: React.MouseEvent<HTMLDivElement,MouseEvent>) => {
		e.preventDefault()
		e.stopPropagation()
		if(!id) return;

		const promise = archive({id})

		toast.promise(promise,{
			loading: 'Sedang mengarsipkan catatan...',
			success: 'Yay... Catatan dipindah ke tong sampah',
			error: 'Ops... gagal mengarsipkan catatan :('
		})
	}

	return (
		<div
			onClick={onClickAction}
			role="button"
			style={{
				paddingLeft: level ? `${(level * 12) + 12}px` : "12px",
			}}
			className={cn('group w-full min-h-[27px] flex items-center text-muted-foreground text-sm font-medium py-1 pr-3 hover:bg-primary/5',
				isActive && 'bg-primary/5 text-primary',
				className
			)}
		>

			{!!id && (
				<div
					className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
					onClick={handleExpand}
					role="button"
				>
					<ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50"/>
				</div>
			)}

			{docIcon ? (
				<div className="shrink-0 text-[18px] mr-2">{docIcon}</div>
				) : (
			<Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground"/>
			)}

			<span className="truncate pointer-events-none">
				{label}
			</span>

			{isSearch && (
				<kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
					<span>
						<span>CTRL + K</span>
					</span>
				</kbd>
			)}

			{!!id && (
				<div className="ml-auto flex items-center gap-x-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
							<div role="button" className="opacity-0 group-hover:opacity-100 h-full rounded-sm ml-auto hover:bg-neutral-300 dark:hover:bg-neutral-600">
								<MoreHorizontal className="text-muted-foreground h-4 w-4"/>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-60"
							align="start"
							side="right"
							forceMount
						>
							<DropdownMenuItem onClick={onArchive}>
								<Trash className="h-4 w-4 mr-2"/>
								Hapus
							</DropdownMenuItem>
							<DropdownMenuSeparator/>
							<div className="text-xs text-muted-foreground">Terakhir diubah oleh: {user?.fullName}</div>
						</DropdownMenuContent>
					</DropdownMenu>
					<div role="button" onClick={onCreate} className="opacity-0 group-hover:opacity-100 h-full rounded-sm ml-auto hover:bg-neutral-300 dark:hover:bg-neutral-600">
						<Plus className="text-muted-foreground h-4 w-4"/>
					</div>
				</div>
			)}
		</div>
	)
}

Item.Skeleton = function ItemSkeleton({level}: {level?: number}) {
	return (
		<div
			style={{
				paddingLeft: level ? `${(level * 12) + 25}px` : "12px",
			}}
			className="flex gap-x-2 py-[3px]"
		>
			<Skeleton className="h-4 w-4"/>
			<Skeleton className="h-4 w-[30%]"/>
		</div>
	)
}