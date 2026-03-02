interface ButtonProps {
	label: string;
	type?: "button" | "submit" | "reset";
	icon?: string;
	onClick?: () => void;
}

export default function Button({
	label,
	type = "button",
	icon,
	onClick,
}: ButtonProps) {
	return (
		<button
			className="relative inline-flex px-5 py-3 items-center justify-center overflow-hidden text-sm text-white font-semibold bg-theme-violet rounded shadow group transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:bg-theme-blue hover:text-theme-violet hover:shadow-lg hover:shadow-black active:bg-theme-blue"
			onClick={onClick}
			type={type}
		>
			<span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56"></span>
			<span className="relative">
				{label}
				{icon ? (
					<i
						className={`${icon} inline-block align-middle my-auto mt-1 ml-2`}
					></i>
				) : null}
			</span>
		</button>
	);
}
