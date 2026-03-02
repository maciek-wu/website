import { useEffect, useRef, useState } from "react";
import { useUi } from "../../hooks/useUi";
import { useUtil } from "../../hooks/useUtil";
import { AppComponents } from "../../utils/definitions";
import TopNavItem from "./TopNavItem";
import UnderlineLink from "./UnderlineLink";

interface TopNavProps {
	showNav?: boolean;
}

export default function TopNav({ showNav = true }: TopNavProps) {
	const { scrollTo } = useUi();
	const { targetInside } = useUtil();
	const [navOpen, setNavOpen] = useState(false);
	const topNavRef = useRef<HTMLDivElement>(null);
	const topNavButtonRef = useRef<HTMLButtonElement>(null);

	function handleScroll() {
		setNavOpen(false);
	}

	function handleClickOutside(event: MouseEvent) {
		if (
			!topNavButtonRef.current ||
			!topNavRef.current ||
			!event.target ||
			targetInside(event.target, topNavButtonRef.current)
		) {
			return;
		}

		if (!targetInside(event.target, topNavRef.current)) {
			setNavOpen(false);
		}
	}

	function handleResumeClick() {
		window.open("/resume.pdf", "_blank");
	}

	useEffect(() => {
		document.addEventListener("scroll", handleScroll, true);
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("scroll", handleScroll, true);
			document.removeEventListener("click", handleClickOutside, true);
		};
	});

	if (!showNav) {
		return <></>;
	}

	return (
		<nav
			className={`flex ${navOpen ? "flex-col h-screen overflow-hidden content-start" : "h-6 md:h-auto justify-items-start"} transition-all duration-300 ease-in-out`}
			role="navigation"
			ref={topNavRef}
		>
			<div className="md:hidden flex justify-end">
				<button
					className="flex px-3 pb-1 cursor-pointer text-xl leading-none text-theme-violet hover:text-white outline-none focus:outline-none"
					type="button"
					onClick={() => setNavOpen(!navOpen)}
					ref={topNavButtonRef}
				>
					<i
						className={`fi ${navOpen ? "fi-sr-cross" : "fi-sr-menu-burger"}`}
					></i>
				</button>
			</div>
			<div className="md:flex w-full md:w-auto md:my-auto">
				<ul
					className={`${
						!navOpen ? "hidden md:flex" : "flex gap-4"
					} flex-col md:flex-row mt-4 pr-2 md:pr-0 md:mt-0 text-right`}
				>
					<TopNavItem>
						<UnderlineLink
							label="Skills"
							onClick={() => scrollTo(AppComponents.skills)}
						/>
					</TopNavItem>
					<TopNavItem>
						<UnderlineLink
							label="Experience"
							onClick={() => scrollTo(AppComponents.experience)}
						/>
					</TopNavItem>
					<TopNavItem>
						<UnderlineLink
							label="About"
							onClick={() => scrollTo(AppComponents.about)}
						/>
					</TopNavItem>
					<TopNavItem>
						<UnderlineLink
							label="Contact"
							onClick={() => scrollTo(AppComponents.contact)}
						/>
					</TopNavItem>
					<TopNavItem>
						<UnderlineLink label="Resume" onClick={handleResumeClick} />
					</TopNavItem>
				</ul>
			</div>
		</nav>
	);
}
