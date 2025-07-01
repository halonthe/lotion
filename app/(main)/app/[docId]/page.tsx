'use client'
import {Id} from "@/convex/_generated/dataModel";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {notFound, useParams} from "next/navigation";
import Toolbar from "@/components/toolbar/toolbar";


export default function AppIdPage() {
	const {docId} = useParams()
	const documents = useQuery(api.documents.getById,{docId: docId as Id<'documents'>})

	if(documents === undefined){
		return <div>loading</div>
	}

	if(documents === null){
		return notFound()
	}

	return (
		<div className="pb-40">
			<div className="h-[35vh]"/>
			<div className="mx-auto md:m-w-3xl lg:m-w-4xl">
				<Toolbar initialData={documents}/>
			</div>
		</div>
	)
}