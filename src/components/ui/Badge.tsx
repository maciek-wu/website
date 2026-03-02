import { useUtil } from "../../hooks/useUtil";

interface BadgeProps {
	label: string;
	bgColor?: string;
}

export default function Badge({ label, bgColor }: BadgeProps) {
	const { isMobile } = useUtil();
	return (
		<span
			className={`relative px-4 py-2 text-theme-blue ${isMobile() ? "text-xs" : "text-md"} rounded hover:text-white group/badge`}
		>
			<span
				className={`absolute inset-0 w-full h-full rounded transition duration-200 transform -translate-x-1 -translate-y-1 bg-gray-700 ease opacity-80 group-hover/badge:translate-x-0 group-hover/badge:translate-y-0`}
			></span>
			<span
				className={`absolute inset-0 w-full h-full rounded transition duration-200 transform translate-x-1 translate-y-1 ${
					bgColor ? bgColor : "bg-gray-800"
				} ease opacity-80 group-hover/badge:translate-x-0 group-hover/badge:translate-y-0 mix-blend-screen`}
			></span>
			<span className="relative text-nowrap">{label}</span>
		</span>
	);
}
