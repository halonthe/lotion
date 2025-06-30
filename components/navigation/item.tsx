'use client'

import {ChevronDown, ChevronRight, LucideIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Id} from "@/convex/_generated/dataModel";

interface ItemProps {
	id?: Id<'documents'>
	docIcon?: string
	isActive?: boolean
	expanded?: boolean
	isSearch?: boolean
	level?: number
	onExpand?: () => void
	label: string
	onClickAction: () => void
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
	const ChevronIcon = expanded ? ChevronDown : ChevronRight

	const handleExpand = () => {

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
					className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
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
		</div>
	)
}