"use client"

import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";

export default function Heading(){
	return(
		<div className="max-w-3xl space-y-4">
			<h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
				Catat, Susun, Berkreasi. Semua dalam satu tempat. Selamat datang di <ins>Lotion</ins>
			</h1>
			<h3 className="text-base sm:text-xl md:text-2xl font-medium">
				Lupakan tumpukan kertas dan tab browser yang berantakan, dengan <ins>Lotion</ins>, semua yang kamu butuhkan ada di satu tempat, terorganisir rapi.
			</h3>
			<Button>
				Enter Lotion
				<ArrowRight/>
			</Button>
		</div>
	)
}