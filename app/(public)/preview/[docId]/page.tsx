'use client'

import dynamic from "next/dynamic";
import {Id} from "@/convex/_generated/dataModel";
import {useMutation, useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {notFound, useParams} from "next/navigation";
import Toolbar from "@/components/toolbar/toolbar";
import Cover from "@/components/global/cover";
import {Skeleton} from "@/components/ui/skeleton";
import { useMemo } from "react";

export default function PreviewIdPage() {
	const {docId} = useParams()

	const documents = useQuery(api.documents.getById,
		{docId: docId as Id<'documents'>})
	const update = useMutation(api.documents.update)

	const Editor = useMemo(() =>
			dynamic(() => import("@/components/content/editor"),{ ssr: false })
		,[])

	const onChange = (content: string) => {
		update({
			id: docId as Id<'documents'>,
			content
		})
	}

	if(documents === undefined){
		return (
			<div>
				<Cover.Skeleton/>
				<div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
					<div className="space-y-4 pl-8 pt-4">
						<Skeleton className="h-14 w-[50%]"/>
						<Skeleton className="h-4 w-[80%]"/>
						<Skeleton className="h-4 w-[40%]"/>
						<Skeleton className="h-4 w-[60%]"/>
					</div>
				</div>
			</div>
		)
	}

	if(documents === null || !documents.isPublished){
		return notFound()
	}

	return (
		<div className="pb-40">
			<Cover preview path={documents.coverImage}/>
			<div className="mx-auto md:m-w-3xl lg:m-w-4xl">
				<Toolbar preview initialData={documents}/>
				<Editor
					editable={false}
					onChangeAction={onChange}
					initialContent={documents.content}
				/>
			</div>
		</div>
	)
}