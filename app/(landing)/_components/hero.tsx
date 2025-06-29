// import Image from "next/image";

export default function Heroes() {
	return (
		<div className="max-w-5xl flex flex-col items-center justify-center">
			<div className="flex items-center">
				<div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400] md:h-[400px] bg-red-400">
					{/*<Image src={"/hero-1.png"} alt={"hero"} fill className={"object-contain dark:hidden"}/>*/}
					{/*<Image src={"/hero-1-dark.png"} alt={"hero"} fill className={"object-contain hidden dark:block"}/>*/}
				</div>
				<div className="relative h-[400px] w-[400px] hidden md:block bg-blue-500">
					{/*<Image src={"/hero-2.png"} alt={"hero"} fill className={"object-contain dark:hidden"}/>*/}
					{/*<Image src={"/hero-2-dark.png"} alt={"hero"} fill className={"object-contain hidden dark:block"}/>*/}
				</div>
			</div>
		</div>
	)
}