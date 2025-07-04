import {create} from "zustand/react";

type ImageCoverStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

export const useImageCover = create<ImageCoverStore>((set) => ({
	isOpen: false,
	onOpen: () => set({isOpen: true}),
	onClose: () => set({isOpen: false})
}))