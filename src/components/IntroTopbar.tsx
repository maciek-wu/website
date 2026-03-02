import { useState } from "react";
import Logo from "./ui/Logo";
import UnderlineLink from "./ui/UnderlineLink";

interface IntroTopbarProps {
	skip: () => void;
}

export default function IntroTopbar({ skip }: IntroTopbarProps) {
	const [skipped, setSkipped] = useState(false);

	function handleSkip() {
		setSkipped(true);
		skip();
	}

	return (
		<header className="fixed top-0 z-20 w-full backdrop-blur-lg">
			<div className="flex w-screen min-h-16 p-5 justify-between items-start content-center">
				<div className="flex h-full">
					<Logo style={"color"} />
				</div>
				<div className="flex h-full">
					{!skipped && <UnderlineLink label="Skip" onClick={handleSkip} />}
				</div>
			</div>
		</header>
	);
}
