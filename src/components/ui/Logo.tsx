import imgLogoColor from "../../assets/img/logo-color.webp";
import imgLogoLight from "../../assets/img/logo-light.webp";

type LogoStyle = "color" | "light";

interface LogoProps {
	style?: LogoStyle;
}

export default function Logo({ style = "color" }: LogoProps) {
	return (
		<img
			className="w-44 h-5"
			src={style === "light" ? imgLogoLight : imgLogoColor}
			alt="maciejwasiak.com"
		/>
	);
}
