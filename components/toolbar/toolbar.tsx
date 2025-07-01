'use client'

import {Doc} from "@/convex/_generated/dataModel";
import IconPicker from "@/components/global/emoji-picker";
import {Button} from "@/components/ui/button";
import {ImageIcon, Smile, X} from "lucide-react";
import {ComponentRef, useRef, useState} from "react";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import TextareaAutosize from 'react-textarea-autosize';

interface ToolbarProps {
	initialData: Doc<'documents'>
	preview?: boolean
}
export default function Toolbar({initialData, preview}: ToolbarProps) {

	const inputRef = useRef<ComponentRef<'textarea'>>(null);
	const [isEditing, setEditing] = useState(false);
	const [value, setValue] = useState(initialData.title);

	const update = useMutation(api.documents.update)
	const removeIcon = useMutation(api.documents.removeIcon)

	const disableInput = () => setEditing(false);
	const enableInput = () => {
		setEditing(true);
		setTimeout(() => {
			setValue(initialData.title);
			inputRef.current?.focus();
		}, 0);
	}

	const onInput = (value: string) => {
		setValue(value);
		update({id: initialData._id, title: value || 'Untitled'})
	}

	const onKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			disableInput();
		}
	}

	const onIconSelect = (icon: string) => {
		update({id: initialData._id, icon})
	}

	const onIconRemove = () => {
		removeIcon({id: initialData._id})
	}

	return (
		<div className="group relative pl-[54px]">
			{!!initialData.icon && !preview && (
				<div className="flex items-center gap-x-2 group/icon pt-6">
					<IconPicker onChange={onIconSelect}>
						<p className="text-6xl hover:opacity-75 transition">{initialData.icon}</p>
					</IconPicker>
					<Button
						className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-xs text-muted-foreground"
						onClick={onIconRemove}
						variant="outline"
						size='icon'
					>
						<X className="w-4 h-4"/>
					</Button>
				</div>
			)}

			{!!initialData.icon && preview && (
				<p className="text-6xl pt-6 hover:opacity-75 transition">
					{initialData.icon}
				</p>
			)}

			<div className="opacity-0 group-hover:opacity-100 transition flex items-center gap-x-1 py-2">
				{!initialData.icon && !preview && (
					<IconPicker asChild onChange={onIconSelect}>
						<Button
							className="text-xs text-muted-foreground"
							variant="outline"
							size="sm"
						>
							<Smile className="w-4 h-4"/>
							Tambah Icon
						</Button>
					</IconPicker>
				)}

				{!initialData.coverImage && !preview && (
					<Button
						className="text-xs text-muted-foreground"
						variant="outline"
						size="sm"
						onClick={() => {}}
					>
						<ImageIcon className="w-4 h-4"/>
						Tambah Cover
					</Button>
				)}
			</div>
			{isEditing && !preview ? (
				<TextareaAutosize
					ref={inputRef}
					onBlur={disableInput}
					onKeyDown={onKeyPress}
					value={value}
					onChange={(e) => onInput(e.target.value)}
					className="text-5xl bg-transparent font-bold break-words outline-none focus:outline-none text-[#3f3f3f] dark:text-[#cfcfcf] resize-none"
				/>
			) : (
				<div
					role="button"
					onClick={enableInput}
					className="pb-[11.5px] text-5xl font-bold break-words outline-none"
				>
					{initialData.title}
				</div>
			)}
		</div>
	)
}