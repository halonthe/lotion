'use client'
import Image from "next/image";
import {useUser} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";

export default function AppPage(){
	const {user} = useUser()
	return (
		<div className="h-full flex flex-col items-center justify-center space-y-4">
			<Image width={300} height={300} src="/empty.png" alt="empty" className="dark:hidden"/>
			<Image width={300} height={300} src="/empty-dark.png" alt="empty" className="hidden dark:block"/>
			<h2 className="text-lg font-medium">
				Welcome to {user?.firstName}&apos;s Lotion
			</h2>
			<Button>
				<PlusCircle/>
				Buat Catatan
			</Button>
		</div>
	)
}