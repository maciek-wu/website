interface SubHeaderProps {
	message: string;
	color?: string;
}

export default function SubHeader({ message, color = "" }: SubHeaderProps) {
	return (
		<h3
			className={`w-full my-4 text-2xl text-slate-100 text-shadow${
				color ? ` ${color}` : ""
			}`}
		>
			<span className="text-theme-blue font-semibold">_</span>
			{message}
		</h3>
	);
}
