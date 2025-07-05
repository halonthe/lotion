'use client'
import React from "react";
import {useConvexAuth} from "convex/react";
import Spinner from "@/components/ui/spinner";
import {redirect} from "next/navigation";
import Navigation from "@/components/navigation/navigation";
import SearchCommand from "@/components/global/search-command";

export default function MainLayout({children,}: { children: React.ReactNode; }) {
	const {isAuthenticated, isLoading} = useConvexAuth()

	if(isLoading){
		return (
			<div className="h-full flex items-center justify-center">
				<Spinner size={"lg"}/>
			</div>
		)
	}

	if(!isAuthenticated){
		return redirect("/")
	}

	return (
		<div className="h-full flex bg-background dark:bg-[#1F1F1F]">
			<Navigation/>
			<main className="flex-1 h-full overflow-y-auto">
				<SearchCommand/>
				{children}
			</main>
		</div>
	);
}