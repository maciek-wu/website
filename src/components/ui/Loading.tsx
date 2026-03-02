import { useEffect, useState } from "react";
import { useUtil } from "../../hooks/useUtil";
import Logo from "./Logo";
import ProgressBar from "./ProgressBar";

export default function Loading() {
	const { pause } = useUtil();
	const [label, setLabel] = useState("loading ... data");
	const stages = ["components", "styles", "effects"];
	const progress = 100;
	const interval = 20;
	const stageInterval = Math.floor((progress * interval) / (stages.length - 1));

	async function updateLabel(stage: number = 0) {
		if (stage === stages.length) {
			setLabel("completed");
			return;
		}
		const stageLabel = `loading ... ${stages[stage]}`;
		await pause(stageInterval);
		setLabel(stageLabel);
		updateLabel(++stage);
	}

	useEffect(() => {
		updateLabel();
	}, []);

	return (
		<main className="bg-theme-dark" data-testid="loadingScreen">
			<div className="w-44 min-h-screen grid grid-cols-1 mx-auto justify-center items-center text-center content-center">
				<div className="inline-block items-center">
					<Logo />
				</div>
				<div className="inline-block mt-2 text-slate-500">
					<ProgressBar
						label={label}
						progress={progress}
						customInterval={interval}
					/>
				</div>
			</div>
		</main>
	);
}
