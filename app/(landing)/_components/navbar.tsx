"use client"
import {useScrollTop} from "@/hooks/use-scroll-top";
import {cn} from "@/lib/utils";
import Logo from "./logo";
import {ModeToggle} from "@/components/global/toggle-mode";
import {useConvexAuth} from "convex/react";
import {SignInButton, UserButton} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";

export default function Navbar(){
	const {isAuthenticated, isLoading} = useConvexAuth()
	const scrolled = useScrollTop()
	return (
		<header className={cn("z-50 bg-background fixed top-0 flex items-center w-full p-6",
			scrolled && "border-b shadow-sm")}>
			<Logo/>
			<div className="flex items-center justify-between w-full md:justify-end md:ml-auto gap-x-2">
				{isLoading && (
					<Spinner/>
				)}
				{!isAuthenticated && !isLoading && (
					<>
					<SignInButton mode={"modal"}>
						<Button variant={"ghost"} size={"sm"}>
							Sign in
						</Button>
					</SignInButton>
						<SignInButton mode={"modal"}>
						<Button size={"sm"}>
							Get Lotion free
						</Button>
					</SignInButton>
					</>
				)}
				{isAuthenticated && !isLoading && (
					<>
					<Button variant={"ghost"} size={"sm"} asChild>
						<Link href={"/app"}>
							Enter Lotion App
						</Link>
					</Button>
						<UserButton/>
					</>
				)}
				<ModeToggle/>
			</div>
		</header>
	)
}