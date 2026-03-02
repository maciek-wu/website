import { PropsWithChildren } from "react";

interface SectionProps {
	id?: string;
	bgColor?: string;
	bgImage?: string;
	style?: string;
	pattern?: boolean;
}

export default function Section({
	children,
	id,
	bgColor = "",
	bgImage = "",
	style = "",
}: PropsWithChildren<SectionProps>) {
	return (
		<section
			id={id}
			className={`flex w-full mb-28 pt-20${bgColor ? ` ${bgColor}` : ""}${
				bgImage ? ` ${bgImage}` : ""
			}${style ? ` ${style}` : ""}`}
		>
			<div className="container w-11/12 xl:w-8/12 mx-auto text-center">
				{children}
			</div>
		</section>
	);
}
