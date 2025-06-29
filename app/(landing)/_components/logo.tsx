// import Image from "next/image";

export default function Logo(){
	return (
		<div className="hidden md:flex items-center gap-x-2">
			{/*<Image src={"logo.svg"} alt={"logo"} width={40} height={40} className="dark:hidden"/>*/}
			{/*<Image src={"logo-dark.png"} alt={"logo"} width={40} height={40} className="hidden dark:block"/>*/}
			<p className="font-semibold">
				Lotion
			</p>
		</div>
	)
}