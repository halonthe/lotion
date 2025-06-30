"use client"

import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import {useConvexAuth} from "convex/react";
import Spinner from "@/components/global/spinner";
import Link from "next/link";
import {SignInButton} from "@clerk/nextjs";

export default function Heading(){
	const {isAuthenticated, isLoading} = useConvexAuth()
	return(
		<div className="max-w-3xl space-y-4">
			<h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
				Catat, Susun, Berkreasi. Semua dalam satu tempat. Selamat datang di <ins>Lotion</ins>
			</h1>
			<h3 className="text-base sm:text-xl md:text-2xl font-medium">
				Lupakan tumpukan kertas dan tab browser yang berantakan, dengan <ins>Lotion</ins>, semua yang kamu butuhkan ada di satu tempat, terorganisir rapi.
			</h3>
			{isLoading && (
				<div className="w-full flex items-center justify-center">
				<Spinner size={"lg"}/>
				</div>
			)}
			{isAuthenticated && !isLoading && (
				<Button>
					<Link href={"/app"}>Enter Lotion</Link>
					<ArrowRight/>
				</Button>
			)}
			{!isAuthenticated && !isLoading && (
				<SignInButton mode={"modal"}>
					<Button>
						Get Lotion Free
						<ArrowRight/>
					</Button>
				</SignInButton>
			)}
		</div>
	)
}