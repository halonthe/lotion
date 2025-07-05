import Image from "next/image";

export default function Heroes() {
	return (
		<div className="max-w-5xl flex flex-col items-center justify-center">
			<div className="flex items-center">
				<div className="relative w-[400px] h-[300px] sm:w-[600px] sm:h-[350px] md:w-[700px] md:h-[400px] ">
					<Image src={"/hero.png"} alt={"hero"} fill className={"object-contain dark:invert"}/>
				</div>
			</div>
		</div>
	)
}