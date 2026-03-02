import { useEffect, useState } from "react";
import { createCursor } from "../../utils/common";
import { AnimationStep } from "../../utils/definitions";
import Button from "./Button";
import SpaceBackground from "./effects/SpaceBackground";
import Spaceman from "./effects/Spaceman";
import Text from "./Text";

export default function NotFound() {
	const [spacemenSteps] = useState<AnimationStep[]>([
		{ action: "moveDown", delay: 1000 },
	]);

	function handleReturn() {
		window.location.href = "/";
	}

	useEffect(() => {
		createCursor();
	}, []);

	return (
		<main className="bg-theme-dark" data-testid="loadingScreen">
			<SpaceBackground />
			<Spaceman position={["top-20", "right-40"]} steps={spacemenSteps} />
			<div className="relative w-full h-screen grid grid-cols-1 justify-center items-center text-center content-center bg-grid-lower bg-bottom bg-no-repeat bg-cover">
				<div className="relative max-w-200 mx-auto p-4 bg-theme-dark border border-gray-900 shadow-lg shadow-black rounded-lg sm:p-10">
					<div className="flex justify-between text-sm text-slate-400">
						<div className="">
							Protocol: <span className="font-semibold">500</span>
						</div>
						<div className="">
							Priority:{" "}
							<span className="font-semibold text-theme-sky">Urgent</span>
						</div>
					</div>
					<h2 className="mt-4 text-2xl text-theme-orange">
						Warning: We have encountered a failure
					</h2>
					<div className="mt-2 mb-10">
						<Text content="Please remain calm, a troop of well-trained monkeys is already working on a solution." />
						<Text content="We recommend returning to the main course. If the problem persists, please report it to the commander." />
						<h4 className="w-full my-6 text-xs">
							<a href="mailto:hello@maciejwasiak.com">hello@maciejwasiak.com</a>
						</h4>
					</div>
					<Button
						type="button"
						label="Return to main course"
						onClick={handleReturn}
					/>
				</div>
			</div>
		</main>
	);
}
