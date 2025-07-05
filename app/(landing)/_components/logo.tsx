

export default function Logo(){
	return (
		<div className="hidden md:flex items-center">
			<video autoPlay loop muted width={40} height={40} className="dark:invert">
				<source src={"/logo.webm"} type="video/webm"/>
			</video>
			<h2 className="font-semibold">
				Lotion
			</h2>
		</div>
	)
}