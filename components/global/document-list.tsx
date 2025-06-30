'use client'

import {Doc, Id} from "@/convex/_generated/dataModel";
import {useParams, useRouter} from "next/navigation";
import {useState} from "react";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import Item from "@/components/navigation/item";
import {cn} from "@/lib/utils";
import {FileIcon} from "lucide-react";

interface DocumentListProps {
	parentDocId?: Id<'documents'>
	level?: number
	data?: Doc<'documents'>[]
}

export default function DocumentList({parentDocId, level = 0}: DocumentListProps) {
	const params = useParams()
	const router = useRouter()

	const [expanded, setExpanded] = useState<Record<string, boolean>>({})

	const onExpand = (docId: string) => {
		setExpanded(prevState => ({ ...prevState, [docId]: !prevState[docId] }))
	}

	const onRedirect = (docId: string) => {
		router.push(`/app/${docId}`)
	}

	const documents = useQuery(api.documents.getSidebar, {
		parentDocument: parentDocId
	})

	if(documents === undefined){
		return (
			<>
				<Item.Skeleton level={level} />
				{level === 0 && (
					<>
					<Item.Skeleton level={level} />
					<Item.Skeleton level={level} />
					</>
				)}
			</>
		)
	}

	return(
		<>
			<p
				className={cn("hidden text-sm font-medium text-muted-foreground/80",
					expanded && "last:block",
					level === 0 && "hidden",
					)}
				style={{
				paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
			}}>
				Tidak ada apapun.
			</p>
			{documents.map(doc => (
				<div key={doc._id}>
					<Item
						id={doc._id}
						label={doc.title}
						onClickAction={() => onRedirect(doc._id)}
						icon={FileIcon}
						docIcon={doc.icon}
						isActive={params.docId === doc._id}
						level={level}
						onExpand={() => onExpand(doc._id)}
						expanded={expanded[doc._id]}
					/>
					{expanded[doc._id] && (
						<DocumentList parentDocId={doc._id} level={level + 1}/>
					)}
				</div>
			))}
		</>
	)
}