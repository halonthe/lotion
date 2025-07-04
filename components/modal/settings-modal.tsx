'use client'

import {useSettings} from "@/hooks/use-settings";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {ModeToggle} from "@/components/global/toggle-mode";

export default function SettingsModal() {
	const settings = useSettings();
	return (
		<Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
			<DialogContent>
				<DialogHeader className="border-b pb-3">
					<DialogTitle className="text-lg font-medium">Pengaturan</DialogTitle>
				</DialogHeader>
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-y-1">
						<Label>Tampilan</Label>
						<span>sesuaikan tampilan Lotion di device kamu.</span>
					</div>
					<ModeToggle/>
				</div>
			</DialogContent>
		</Dialog>
	)
}