import { useEffect, useRef, useState } from "react";
import { useUtil } from "../../../hooks/useUtil";
import { AnimationStep } from "../../../utils/definitions";

interface TransformImageProps {
	src: string;
	steps: AnimationStep[];
	width?: string;
}

export default function TransformImage({
	src,
	steps,
	width = "w-screen",
}: TransformImageProps) {
	const { pause, addStyle, removeStyle } = useUtil();
	const imgRef = useRef<HTMLImageElement>(null);
	const [img, setImg] = useState<HTMLImageElement | null>(imgRef.current);

	function translateUp() {
		if (!img) {
			return;
		}
		removeStyle(["translate-y-full"], img);
		addStyle(["translate-y-0"], img);
	}

	function scaleUp() {
		if (!img) {
			return;
		}
		removeStyle(["scale-100"], img);
		addStyle(["scale-[5]"], img);
	}

	async function run() {
		if (!steps || !steps.length) return;

		for await (const step of steps) {
			const delay = step.delay ?? 0;
			await pause(delay);
			switch (step.action) {
				case "moveUp":
					translateUp();
					break;
				case "scaleUp":
					scaleUp();
					break;
			}
		}
	}

	useEffect(() => {
		if (!imgRef.current) {
			return;
		}

		setImg(imgRef.current);

		if (!img) {
			return;
		}

		run();
	}, [imgRef.current, steps]);

	return (
		<img
			ref={imgRef}
			className={`absolute bottom-0 right-0 ${width} scale-100 translate-y-full transition-transform duration-[5s] ease-in-out`}
			src={src}
		/>
	);
}
