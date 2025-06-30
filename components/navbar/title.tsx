'use client'

import {Doc} from "@/convex/_generated/dataModel";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useRef, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";

interface TitleProps {
	initialData: Doc<'documents'>
}

export default function Title({initialData}: TitleProps) {
	const update = useMutation(api.documents.update)

	const inputRef = useRef<HTMLInputElement>(null);

	const [title, setTitle] = useState(initialData.title || "Untitled")
	const [isEditing, setEditing] = useState(false)

	const enableInput = () => {
		setTitle(initialData.title)
		setEditing(true)

		setTimeout(() => {
			inputRef.current?.focus()
			inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
		},0)
	}

	const disableInput = () => {
		setEditing(false)
	}

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value)
		update({
			id: initialData._id,
			title: e.target.value || 'Untitled',
		})
	}

	const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if(e.key === 'Enter') {
			disableInput()
		}
	}

	return (
		<div className="flex items-center gap-x-1">
			{!!initialData.icon && (<p>{initialData.icon}</p>)}
			{isEditing ? (
				<Input
					ref={inputRef}
					onClick={enableInput}
					onBlur={disableInput}
					onChange={onChange}
					onKeyDown={onKeyPress}
					value={title}
					className="h-7 px-2 focus-visible:ring-transparent"
				/>
			) : (
				<Button
					variant="ghost"
					size="sm"
					className="font-normal h-auto p-1"
					onClick={enableInput}
				>
					<span className="truncate">{initialData?.title}</span>
				</Button>
			)}
		</div>
	)
}

Title.Skeleton = function TitleSkeleton() {
	return (
		<Skeleton className="h-7 w-20 rounded-md"/>
	)
}