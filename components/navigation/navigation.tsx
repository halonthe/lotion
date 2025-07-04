'use client'

import React, {ComponentRef, useEffect, useRef, useState} from "react";
import {ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash} from "lucide-react";
import {useMediaQuery} from "usehooks-ts";
import {useParams, usePathname, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import UserItem from "@/components/global/user-item";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import Item from "@/components/navigation/item";
import {toast} from "sonner";
import DocumentList from "@/components/navigation/document-list";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import TrashBin from "@/components/global/trash-bin";
import {useSearch} from "@/hooks/use-search";
import {useSettings} from "@/hooks/use-settings";
import Navbar from "@/components/navbar/navbar";

export default function Navigation(){
	const search = useSearch()
	const settings = useSettings()
	const params = useParams()
	const pathname = usePathname();
	const router = useRouter()
	const isMobile = useMediaQuery("(max-width: 760px)");

	const create = useMutation(api.documents.create)

	const isResizing = useRef(false);
	const sidebarRef = useRef<ComponentRef<"aside">>(null);
	const navbarRef = useRef<ComponentRef<"div">>(null);

	const [isReset, setIsReset] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(isMobile);

	useEffect(() => {
		if(isMobile){
			collapse()
		}else{
			resetWidth()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[isMobile])

	useEffect(() => {
		if(isMobile){
			collapse()
		}
	}, [pathname, isMobile]);

	const handleMouseMove = (e: MouseEvent) => {
		if(!isResizing.current) return;

		let width = e.clientX;
		if(width < 240) width = 240;
		if(width > 480) width = 480;

		if(sidebarRef.current && navbarRef.current){
			sidebarRef.current.style.width = `${width}px`;
			navbarRef.current.style.setProperty('left', `${width}px`)
			navbarRef.current.style.setProperty('width', `calc(100% - ${width}px)`)
		}
	}

	const handleMouseUp = () => {
		isResizing.current = false;
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUp);
	}

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault();
		e.stopPropagation();

		isResizing.current = true;
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	}

	const resetWidth = () => {
		if(sidebarRef.current && navbarRef.current){
			setIsCollapsed(false);
			setIsReset(true);

			sidebarRef.current.style.width = isMobile ? "100%" : "240px";
			navbarRef.current.style.setProperty('width', isMobile ? "0" : "calc(100% - 240px)");
			navbarRef.current.style.setProperty('left', isMobile ? "100%" : "240px");

			setTimeout(()=> {
				setIsReset(false);
			},300)
		}
	}

	const collapse = () => {
		if(sidebarRef.current && navbarRef.current){
			setIsCollapsed(true);
			setIsReset(true);

			sidebarRef.current.style.width = "0";
			navbarRef.current.style.setProperty('width', '100%');
			navbarRef.current.style.setProperty('left', '0');
		}
	}

	const handleCreate = () => {
		const promise = create({title: 'Untitled'})
			.then(docId => router.push(docId))

		toast.promise(promise,{
			loading: 'Sedang membuat catatan...',
			success: 'Yay... berhasil membuat catatan!',
			error: 'Ops... gagal membuat catatan :('
		})
	}

	return(
		<>
			<aside
				ref={sidebarRef}
				className={cn("group/sidebar h-full bg-secondary overflow-y-auto relative flex flex-col w-60 z-50",
					isReset && "transition-all ease-in-out duration-300",
					isMobile && "w-0",
				)}
			>
				<div
					onClick={collapse}
				role="button"
				className={cn("w-6 h-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 z-50 opacity-0 group-hover/sidebar:opacity-100 transition",
					isMobile && "opacity-100",
				)}
				>
					<ChevronsLeft className="w-6 h-6"/>
				</div>

				<div>
					<UserItem/>
					<Item label={'Cari'} onClickAction={search.onOpen} icon={Search} isSearch/>
					<Item label={'Pengaturan'} onClickAction={settings.onOpen} icon={Settings}/>
					<Item label={'Halaman Baru'} onClickAction={handleCreate} icon={PlusCircle}/>
				</div>

				<div className="mt-4">
					<DocumentList/>
					<Item label={'Tambah Halaman'} onClickAction={handleCreate} icon={Plus}/>
					<Popover>
						<PopoverTrigger className="w-full mt-4">
							<Item label={'Sampah'} icon={Trash}/>
						</PopoverTrigger>
						<PopoverContent className="p-0 w-72" side={isMobile ? "bottom" : "right"}>
							<TrashBin/>
						</PopoverContent>
					</Popover>
				</div>

				<div
					onMouseDown={handleMouseDown}
					onClick={resetWidth}
					className="opacity-0 group-hover/sidebar:opacity-100 cursor-ew-resize transition absolute top-0 right-0 h-full w-1 bg-primary/10"
				/>
			</aside>
			<div
				ref={navbarRef}
				className={cn("absolute top-0 left-60 w-[calc(100% - 240px)] z-50",
					isReset && "transition-all ease-in-out duration-300",
					isMobile && "left-0 w-full",
				)}
			>
				{!!params.docId ? (
					<Navbar isCollapsed={isCollapsed} onResetWidthAction={resetWidth}/>
					) : (
					<nav className="bg-transparent px-3 py-2 w-full">
						{isCollapsed && (<MenuIcon onClick={resetWidth} role="button" className="w-6 h-6 text-muted-foreground"/>)}
					</nav>
				)}
			</div>

		</>
	)
}
