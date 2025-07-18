'use client'

import SettingsModal from "@/components/modal/settings-modal";
import {useEffect, useState} from "react";
import ImageUploadModal from "@/components/modal/image-upload-modal";

export default function ModalProvider(){
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true);
	},[])

	if(!isMounted){
		return null
	}

	return (
		<>
			<SettingsModal/>
			<ImageUploadModal/>
		</>
	)
}