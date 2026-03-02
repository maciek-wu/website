import { useEffect, useState } from "react";
import { useUtil } from "../../hooks/useUtil";

interface ProgressBarProps {
	label: string;
	progress: number;
	customInterval?: number;
	onComplete?: () => void;
}

export default function ProgressBar({
	label,
	progress,
	customInterval,
	onComplete,
}: ProgressBarProps) {
	const [value, setValue] = useState(0);
	const { pause } = useUtil();
	const step = 1;
	const interval = customInterval ?? 50;

	async function animate(v: number) {
		const newValue = v + step;

		if (newValue >= progress) {
			setValue(progress);
			if (onComplete) {
				onComplete();
			}
			return;
		}

		setValue(newValue);
		await pause(interval);
		return animate(newValue);
	}

	useEffect(() => {
		if (value === progress) return;
		animate(value);
	}, []);

	return (
		<div>
			<div className="mb-2 flex justify-between items-center">
				<h3 className="text-xs font-medium text-foreground">{label}</h3>
				<span className="text-xs text-foreground">{value}%</span>
			</div>
			<div
				className="flex w-full h-1 bg-slate-700 rounded-full overflow-hidden"
				role="progressbar"
			>
				<div
					className={`flex flex-col justify-center rounded-full overflow-hidden bg-theme-green transition duration-500`}
					style={{
						width: `${value}%`,
					}}
				></div>
			</div>
		</div>
	);
}
