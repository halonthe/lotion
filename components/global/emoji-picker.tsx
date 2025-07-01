'use client'

import {useTheme} from "next-themes";
import EmojiPicker, {Theme} from "emoji-picker-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

interface IconPickerProps {
	children: React.ReactNode
	asChild?: boolean
	onChange: (icon: string) => void
}
export default function IconPicker({onChange, children, asChild}: IconPickerProps) {

	const {resolvedTheme} = useTheme()
	const currentTheme = (resolvedTheme || 'system') as keyof typeof themeMap

	const themeMap ={
		"dark": Theme.DARK,
		"light": Theme.LIGHT,
		"system": Theme.AUTO
	}
	const theme = themeMap[currentTheme]

	return (
		<Popover>
			<PopoverTrigger asChild={asChild}>
				{children}
			</PopoverTrigger>
			<PopoverContent className="p-0 border-none shadow-none w-full">
				<EmojiPicker
					height={350}
					theme={theme}
					onEmojiClick={(data) => onChange(data.emoji)}
				/>
			</PopoverContent>
		</Popover>
	)
}