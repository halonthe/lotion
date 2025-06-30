'use client'

import {useParams} from "next/navigation";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {Id} from "@/convex/_generated/dataModel";
import {MenuIcon} from "lucide-react";
import Title from "@/components/navbar/title";
import Banner from "@/components/navbar/banner";
import Menu from "@/components/navbar/menu";

interface NavbarProps {
	isCollapsed: boolean
	onResetWidthAction: () => void
}

export default function Navbar({isCollapsed, onResetWidthAction}: NavbarProps) {
	const params = useParams()
	const documents = useQuery(api.documents.getById, {
		docId: params.docId as Id<'documents'>
	})

	if(documents === undefined){
		return <nav className="bg-background px-3 py-2 w-full flex items-center justify-between">
			<Title.Skeleton/>
			<Menu.Skeleton/>
		</nav>
	}

	if(documents === null){
		return null
	}

	return (
		<>
			<nav className="bg-background px-3 py-2 w-full flex items-center gap-x-4">
				{isCollapsed && (
					<MenuIcon role="button" onClick={onResetWidthAction} className="h-6 w-6 text-muted-foreground"/>
				)}
				<div className="flex items-center justify-between w-full">
					<Title initialData={documents}/>
					<Menu docId={documents._id}/>
				</div>
			</nav>
				{documents.isArchived && (<Banner docId={documents._id}/>)}
		</>
	)
}