'use client'

import {Doc} from "@/convex/_generated/dataModel";
import {useOrigin} from "@/hooks/use-origin";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useState} from "react";
import {toast} from "sonner";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Check, Copy, Globe} from "lucide-react";

interface PublishProps {
	initialData: Doc<'documents'>
}

export default function Publish({initialData}: PublishProps) {
	const origin = useOrigin()
	const update = useMutation(api.documents.update)

	const [copied, setCopied] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const url = `${origin}/preview/${initialData._id}`

	const onPublish = () => {
		setIsSubmitting(true);

		const promises = update({id: initialData._id, isPublished: true})
			.finally(() => setIsSubmitting(false))

		toast.promise(promises, {
			loading: 'Sedang menerbitkan catatan...',
			success: 'Yay... catatan berhasil diterbitkan',
			error: 'Yah... gagal menerbitkan catatan',
		})
	}

	const onUnPublish = () => {
		setIsSubmitting(true);

		const promises = update({id: initialData._id, isPublished: false})
			.finally(() => setIsSubmitting(false))

		toast.promise(promises, {
			loading: 'Sedang membatalkan publikasi catatan...',
			success: 'Yay... publikasi dibatalkan',
			error: 'Yah... gagal membatalkan publikasi catatan',
		})
	}

	const onCopy = () => {
		const promises = navigator.clipboard.writeText(url)
			.then(() => setCopied(true))

		toast.promise(promises, {
			success: 'berhasil menyalin url',
			error: 'Yah... sepertinya ada masalah',
		})

		setTimeout(() => setCopied(false), 1000)
	}

	return (
		<Popover>
			<PopoverTrigger>
				<span
					className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
				>
					Publish
					{initialData.isPublished && (
						<Globe className="w-4 h-4 text-sky-500"/>
					)}
				</span>
			</PopoverTrigger>
			<PopoverContent
				className="w-72"
				align="end"
				alignOffset={8}
				forceMount
			>
				{initialData.isPublished ? (
					<div className="space-y-4">
						<div className="flex items-center gap-x-2">
							<Globe className="w-4 h-4 text-sky-500 animate-pulse"/>
							<p className="text-xs text-sky-500 font-medium">
								Catatan ini &apos;live&apos; di web.
							</p>
						</div>
						<div className="flex items-center">
							<input
								className="flex-1 px-2 rounded-l-md border text-xs h-8 bg-muted truncate"
								value={url}
								readOnly
							/>
							<Button
								disabled={copied}
								onClick={onCopy}
								className="h-8 rounded-l-none"
							>
								{copied ? (
									<Check className="w-4 h-4"/>
								) : (
									<Copy className="w-4 h-4"/>
								)}
							</Button>
						</div>
						<Button
							className="w-full text-xs"
							size="sm"
							disabled={isSubmitting}
							onClick={onUnPublish}
						>
							Batalkan Publish
						</Button>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center">
						<Globe className="h-8 w-8 text-muted-foreground mb-2"/>
						<p className="text-sm font-medium mb-2">
							Terbitkan catatan
						</p>
						<span className="text-xs text-muted-foreground mb-4">
							Bagikan catatanmu ke orang lain.
						</span>
						<Button
							disabled={isSubmitting}
							onClick={onPublish}
							className="w-full text-xs"
							size="sm"
						>
							Publish
						</Button>
					</div>
				)}
			</PopoverContent>
		</Popover>
	)
}