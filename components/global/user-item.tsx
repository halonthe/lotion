'use client'

import {SignOutButton, useUser} from "@clerk/nextjs";
import {
	DropdownMenu,
	DropdownMenuContent, DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {ChevronsUpDown} from "lucide-react";

export default function UserItem() {
	const {user} = useUser()
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex items-center p-3 w-full text-sm hover:bg-primary/5" role="button">
					<div className="flex items-center max-w-[150px] gap-x-2">
						<Avatar className="h-5 w-5">
							<AvatarImage src={user?.imageUrl}/>
						</Avatar>
						<span className="font-medium text-start line-clamp-1">
							{user?.fullName}&apos;s Lotion
						</span>
					</div>
					<ChevronsUpDown className="text-muted-foreground h-4 w-4 ml-2"/>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-80"
				align="start"
				alignOffset={11}
				forceMount
			>
				<div className="flex flex-col space-y-4 p-2">
					<p className="text-xs font-medium text-muted-foreground leading-none">
						{user?.emailAddresses[0].emailAddress}
					</p>
					<div className="flex items-center gap-x-2">
						<div className="rounded-md bg-secondary p-1">
							<Avatar className="w-4 h-4">
								<AvatarImage src={user?.imageUrl}/>
							</Avatar>
						</div>
						<div className="space-y-1">
							<p className="text-sm line-clamp-1">
								{user?.fullName}&apos;s Lotion
							</p>
						</div>
					</div>
				</div>
				<DropdownMenuSeparator/>
				<DropdownMenuItem className="cursor-pointer w-full text-muted-foreground" asChild>
					<SignOutButton>
						Sign Out
					</SignOutButton>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}