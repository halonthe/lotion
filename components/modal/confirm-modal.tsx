'use client'

import {
	AlertDialog, AlertDialogAction, AlertDialogCancel,
	AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import React from "react";

interface ConfirmModalProps {
	children: React.ReactNode
	onConfirmAction: () => void
}

export default function ConfirmModal({children,onConfirmAction}: ConfirmModalProps) {

	const handleConfirm = (e: React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
		e.preventDefault();
		e.stopPropagation();
		onConfirmAction()
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
				{children}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Apa kamu yakin?</AlertDialogTitle>
					<AlertDialogDescription>
						Aksi ini akan menghapus data secara permanen.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={(e) => e.stopPropagation()}>Batal</AlertDialogCancel>
					<AlertDialogAction onClick={handleConfirm}>Konfirmasi</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}