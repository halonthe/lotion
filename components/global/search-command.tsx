'use client'

import {useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useSearch} from "@/hooks/use-search";
import {useEffect, useState} from "react";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from "@/components/ui/command";
import {File} from "lucide-react";

export default function SearchCommand(){
	const {user} = useUser()
	const router = useRouter()
	const documents = useQuery(api.documents.getSearch)

	const toggle = useSearch((store) => store.toggle)
	const isOpen = useSearch((store) => store.isOpen)
	const onClose = useSearch((store) => store.onClose)

	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true);
	},[])

	useEffect(() => {
		const keypress = (e: KeyboardEvent) => {
			if(e.key === "k" && (e.metaKey || e.ctrlKey)){
				e.preventDefault()
				toggle()
			}
		}

		document.addEventListener("keydown", keypress);
		return () => document.removeEventListener("keydown", keypress);
	}, [toggle]);

	const onSelect = (id: string) => {
		router.push(`/app/${id}`)
		onClose()
	}

	if(!isMounted){
		return null
	}

	return (
		<CommandDialog open={isOpen} onOpenChange={onClose}>
			<CommandInput placeholder={`Cari ${user?.fullName}'s Lotion...`}/>
			<CommandList>
				<CommandEmpty>Tidak ketemu.</CommandEmpty>
				<CommandGroup heading="Documents">
					{documents?.map((doc) => (
						<CommandItem
							key={doc._id}
							value={`${doc._id}-${doc.title}`}
							title={doc.title}
							onSelect={onSelect}
						>
							{doc.icon ? (
								<p className="mr-2 text-[18px]">{doc.icon}</p>
							) : (
								<File className="w-4 h-4 mr-2"/>
							)}
							<span>{doc.title}</span>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	)
}