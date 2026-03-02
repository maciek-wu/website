export const HeaderTheme = {
	Light: "light",
	Dark: "dark",
	Color: "color",
};

interface HeaderProps {
	message: string;
	theme?: string;
}

export default function Header({
	message,
	theme: style = HeaderTheme.Dark,
}: HeaderProps) {
	function getTheme() {
		switch (style) {
			case HeaderTheme.Light:
				return "text-white shadow-gray-500";
			case HeaderTheme.Color:
				return "text-theme-blue shadow-gray-100";
			case HeaderTheme.Dark:
			default:
				return "shadow-slate-950";
		}
	}

	return (
		<h2
			className={`w-full mb-6 text-3xl text-slate-100 font-semibold text-shadow ${getTheme()}`}
		>
			<span className="text-theme-blue">&lt;</span>
			{message}
			<span className="text-theme-blue"> &#47;&gt;</span>
		</h2>
	);
}
