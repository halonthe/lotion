'use client'

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {useTheme} from "next-themes";
import {PartialBlock} from "@blocknote/core";
import {upload} from "@imagekit/next";
import {authenticator} from "@/lib/utils";

interface EditorProps {
	initialContent?: string
	editable?: boolean
	onChangeAction: (value: string) => void
}

export default function Editor({ initialContent, editable, onChangeAction }: EditorProps) {
	const { resolvedTheme } = useTheme();

	const uploadFile = async (file: File, _blockId?: string): Promise<string> => {
		try {
			const authParams = await authenticator();

			const { signature, expire, token, publicKey } = authParams;

			const response = await upload({
				expire,
				token,
				signature,
				publicKey,
				file,
				folder: "/Lotion",
				fileName: file.name,
			});

			if(!response.url) return ""
			return response.url;
		} catch (error) {
			console.error("Upload failed:", error);
			return "";
		}
	}

	const editor = useCreateBlockNote({
		initialContent:
			initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
		uploadFile,
	});

	return(
		<>
			<BlockNoteView
				theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
				editable={editable}
				editor={editor}
				onChange={(editor) => {
					onChangeAction(JSON.stringify(editor.document, null, 2));
				}}
			/>
		</>
	)
}