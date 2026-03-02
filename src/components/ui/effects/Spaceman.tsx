import { useEffect, useRef, useState } from "react";
import imgSpacesuit from "../../../assets/img/spacesuit.webp";
import { useUtil } from "../../../hooks/useUtil";
import { AnimationStep } from "../../../utils/definitions";

interface SpacemanProps {
	position?: string[];
	steps?: AnimationStep[];
}

export default function Spaceman({ position, steps }: SpacemanProps) {
	const { addStyle, removeStyle, replaceStyle, getRandValue, pause, throttle } =
		useUtil();
	const [message, setMessage] = useState("Oh, hi!");
	const [messageVisible, setMessageVisible] = useState(false);
	const spacemanRef = useRef<HTMLDivElement>(null);
	const messageRef = useRef<HTMLDivElement>(null);

	function setPosition() {
		if (!spacemanRef.current) return;
		position = position ?? ["bottom-10", "right-10"];
		spacemanRef.current.classList.add(...position);
	}

	async function animate() {
		if (!spacemanRef.current) return;
		const rotateClass = getRandValue([
			"rotate-0",
			"-rotate-3",
			"-rotate-6",
			"rotate-0",
		]);
		await pause(1000);
		addStyle([rotateClass, "translate-y-10"], spacemanRef.current);
		await pause(5000);
		removeStyle([rotateClass, "translate-y-10"], spacemanRef.current);
		await pause(5000);
		return animate();
	}

	function translateUp() {
		if (!spacemanRef.current) return;
		replaceStyle("translate-y-full", "-translate-y-full", spacemanRef.current);
	}

	function translateDown() {
		if (!spacemanRef.current) return;
		replaceStyle("-translate-y-full", "translate-y-10", spacemanRef.current);
	}

	async function run() {
		if (!steps) return;
		for await (const step of steps) {
			const delay = step.delay ?? 0;
			await pause(delay);
			switch (step.action) {
				case "moveUp":
					translateUp();
					break;
				case "moveDown":
					translateDown();
					break;
			}
		}
	}

	async function scrollMessage() {
		const message = getRandValue([
			"Just scroll down",
			"Scroll baby scroll!",
			"Woah, I'm flying!",
		]);
		await pause(500);
		setMessage(message);
	}

	function hoverMessage() {
		const message = getRandValue([
			"Uh, what is this?",
			"Oh, no no no ...",
			"Hi!",
			"I'm just a spacesuit!",
			"Oh, hello!",
		]);
		setMessage(message);
	}

	function clickMessage() {
		const message = getRandValue([
			"Hey, how are you?",
			"I'm just a spacesuit!",
			"Want to learn more?",
			"I have a great view!",
		]);
		setMessage(message);
	}

	function showMessage() {
		if (!messageRef.current || messageVisible) return;
		replaceStyle("opacity-0", "opacity-100", messageRef.current);
		setMessageVisible(true);
	}

	function hideMessage() {
		if (!messageRef.current || !messageVisible) return;
		replaceStyle("opacity-100", "opacity-0", messageRef.current);
		setMessageVisible(false);
	}

	function handleMouseOver() {
		hoverMessage();
		showMessage();
	}

	function handleScrollEnd() {
		hideMessage();
		scrollMessage();
	}

	function handleClick() {
		clickMessage();
		showMessage();
	}

	useEffect(() => {
		if (!spacemanRef.current) return;
		setPosition();
		animate();
		run();
		window.addEventListener("scroll", throttle(showMessage, 200));
		window.addEventListener("scrollend", handleScrollEnd);

		return () => {
			window.removeEventListener("scroll", throttle(showMessage, 200));
			window.removeEventListener("scrollend", handleScrollEnd);
		};
	}, [spacemanRef.current, steps]);

	return (
		<div
			ref={spacemanRef}
			className={`fixed ${steps ? "-translate-y-full" : ""} hidden lg:block scale-50 xl:scale-100 transition-all duration-[5s] ease-in-out hover:translate-x-20`}
			onMouseOver={handleMouseOver}
			onMouseLeave={hideMessage}
			onClick={handleClick}
		>
			<div
				ref={messageRef}
				className="max-w-62.5 mb-4 rounded text-shadow opacity-0 text-center transition-opacity duration-300 ease-in-out text-white"
			>
				{message}
			</div>
			<img className={`relative `} src={imgSpacesuit} />
		</div>
	);
}
