import { useEffect, useRef, useState } from "react";
import { useUtil } from "../../../hooks/useUtil";

interface BlackOutProps {
	active: boolean;
	mode: "in" | "out";
}

export default function BlackOut({ active = false, mode }: BlackOutProps) {
	const { pause } = useUtil();
	const maskRef = useRef<HTMLDivElement>(null);
	const [hidden, setHidden] = useState(false);

	async function hide() {
		if (!maskRef.current) return;
		await pause(2000);
		setHidden(true);
	}

	useEffect(() => {
		if (!active || !maskRef.current) {
			return;
		}
		if (mode === "out") {
			maskRef.current.classList.remove("opacity-0");
			maskRef.current.classList.add("opacity-100");
		} else {
			maskRef.current.classList.remove("opacity-100");
			maskRef.current.classList.add("opacity-0");
			hide();
		}
	}, [maskRef.current, active]);

	if (!active || hidden) return;
	return (
		<div
			ref={maskRef}
			className={`absolute top-0 left-0 z-50 w-screen h-screen bg-black transition-opacity duration-[2s] ${mode === "out" ? "opacity-0 ease-in" : "opacity-100 ease-out"}`}
		></div>
	);
}
