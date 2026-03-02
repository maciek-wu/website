import imgCircle from "../assets/img/circle.svg";
import imgDots1 from "../assets/img/dots1.svg";
import imgDots2 from "../assets/img/dots2.svg";
import TiltEffect from "./ui/effects/TiltEffect";
import Section from "./ui/Section";
import SubHeader from "./ui/SubHeader";

// TODO: Integrate with API
export default function Newsletter() {
	const emailPlaceholder = "Your email here";

	function handleSend() {
		const input = document.getElementById(
			"newsletter-email",
		) as HTMLInputElement;
		if (!validateEmail(input)) {
			return;
		}
	}

	function validateEmail(input: HTMLInputElement): boolean {
		const email = input.value.trim();

		input.classList.replace("ring-red-500", "ring-transparent");
		input.placeholder = emailPlaceholder;

		if (
			!email ||
			!email.includes("@") ||
			!email.includes(".") ||
			email.length < 5
		) {
			input.classList.replace("ring-transparent", "ring-red-500");
			input.placeholder = "Please enter a valid email address";
			input.value = "";
			input.focus();
			return false;
		}
		return true;
	}

	return (
		<Section
			id={"newsletter"}
			bgColor="bg-grid-lower bg-no-repeat bg-bottom bg-cover"
		>
			<div className="relative my-20">
				<img
					src={imgDots1}
					alt=""
					className="absolute -top-20 -left-10 w-40 h-auto drop-shadow-xl"
				/>

				<img
					src={imgDots2}
					alt=""
					className="absolute -bottom-20 left-96 w-60 h-auto drop-shadow-xl"
				/>
				<img
					src={imgCircle}
					alt=""
					className="absolute -top-20 -right-32 w-56 h-auto drop-shadow-xl"
				/>
				<TiltEffect className="relative z-10 p-10 rounded-lg border border-slate-700 bg-linear-to-r from-theme-violet to-theme-sky/50 hover:shadow-xl">
					<div className="md:flex w-full md:justify-between md:items-center">
						<div className="md:w-1/3 text-left mb-5 md:mb-0">
							<SubHeader message="Get in touch" />
							<p className="text-sm text-slate-300">
								Please provide contact email address and I will contact you
								soon.
							</p>
						</div>
						<div className="relative md:w-1/2">
							<input
								id="newsletter-email"
								type="email"
								placeholder={emailPlaceholder}
								className="block w-full py-2.5 px-0 appearance-none text-xs md:text-base text-slate-800 bg-slate-100 ring-1 ring-transparent placeholder:text-slate-400 focus:outline-none"
							/>
							<input
								type="button"
								value="Send"
								className="absolute top-0 right-0 appearance-none text-sm text-white font-semibold bg-theme-violet hover:bg-indigo-600 active:bg-theme-blue focus:ring-0 focus:outline-none"
								onClick={handleSend}
							/>
						</div>
					</div>
				</TiltEffect>
			</div>
		</Section>
	);
}
