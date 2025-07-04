'use client'

import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage(){
	return(
		<div className="h-full flex flex-col items-center justify-center space-y-4">
			<Image
				src="/not-found.png"
				alt='not-found'
				width={300}
				height={300}
				className="dark:hidden"
			/>
			<Image
				src="/not-found-dark.png"
				alt='not-found'
				width={300}
				height={300}
				className="hidden dark:block"
			/>
			<h2 className="text-xl font-medium">
				Not Found
			</h2>
			<Button asChild>
				<Link href="/app">Kembali</Link>
			</Button>
		</div>
	)
}