import imgCircle from "../assets/img/circle.svg";
import imgDoMore from "../assets/img/domore.webp";
import imgDots1 from "../assets/img/dots1.svg";
import imgDots2 from "../assets/img/dots2.svg";
import imgDots3 from "../assets/img/dots3.svg";
import imgNumberBg from "../assets/img/number-bg.webp";
import imgOffice from "../assets/img/office.webp";
import imgStand from "../assets/img/stand.webp";
import imgTriangle from "../assets/img/triangle.svg";
import { useUi } from "../hooks/useUi";
import { AppComponents } from "../utils/definitions";
import Resume from "./Resume";
import Header from "./ui/Header";
import Highlight from "./ui/Highlight";
import Section from "./ui/Section";
import SubHeader from "./ui/SubHeader";
import Text from "./ui/Text";
import TextButton from "./ui/TextButton";

export default function About() {
	const { scrollTo } = useUi();

	return (
		<Section id={AppComponents.about}>
			<div className="text-left">
				<div className="w-full mb-10">
					<Header message="About" />
					<div className="lg:grid lg:grid-cols-2 lg:gap-20 xl:gap-40 w-full mb-40">
						<div className="">
							<SubHeader message="Who I am?" />
							<Highlight
								content="My name is Maciej and I'm a Software Engineer from Warsaw, Poland. 
                I have over 20 years of experience in web application
            development."
							/>
							<Text
								content="I specialize in designing robust system architectures,
            crafting efficient databases, and integrating AI tools to optimize
            business processes."
							/>
							<div className="grid grid-cols-3 md:grid-cols-5 gap-x-0 gap-y-2 mb-4 text-sm text-left">
								<div className="col-span-1">
									<div className="">Name:</div>
									<div className="">Email:</div>
								</div>
								<div className="col-span-2">
									<div className="font-bold text-theme-sky">Maciej Wasiak</div>
									<div className="font-bold text-theme-sky">
										hello@maciejwasiak.com
									</div>
								</div>
								<div className="">
									<div className="">Citizenship:</div>
									<div className="">Residence:</div>
								</div>
								<div className="">
									<div className="font-bold text-theme-sky">Poland</div>
									<div className="font-bold text-theme-sky">Warsaw</div>
								</div>
							</div>
							<div className="mt-10">
								<Resume label="Download CV" />
							</div>
						</div>
						<div className="relative hidden lg:block">
							<img
								src={imgDots2}
								alt=""
								className="absolute -top-20 right-20 w-60 h-auto drop-shadow-xl"
							/>
							<img
								src={imgDots1}
								alt=""
								className="absolute bottom-10 left-0 hidden lg:block w-32 h-auto drop-shadow-xl"
							/>
							<img
								src={imgStand}
								alt=""
								className="absolute top-0 right-10 xl:right-32 w-56 h-80 shadow-xl translate-y-4"
							/>
							<div className="absolute top-10 left-16 hidden 2xl:block">
								<svg
									id="number"
									xmlns="http://www.w3.org/2000/svg"
									height="150"
									viewBox="0 0 185 140"
									style={{
										position: "relative",
										opacity: 1,
										overflow: "hidden",
									}}
								>
									<defs>
										<pattern
											x="0"
											y="0"
											width="185"
											height="140"
											patternUnits="userSpaceOnUse"
											id="numberBg"
											viewBox="0 0 185 140"
										>
											<image
												xmlnsXlink="http://www.w3.org/1999/xlink"
												xlinkHref={imgNumberBg}
												preserveAspectRatio="none"
												x="0"
												y="0"
												width="185"
												height="140"
											></image>
										</pattern>
									</defs>
									<text
										x="45%"
										y="50%"
										id="letter"
										dy="50"
										style={{ fontSize: "145px", textAnchor: "middle" }}
										fill="url('#numberBg')"
									>
										20
									</text>
								</svg>
							</div>
						</div>
					</div>
					<div className="lg:grid lg:grid-cols-5 lg:gap-20 xl:gap-40 mb-40">
						<div className="relative hidden lg:block col-span-2">
							<img
								src={imgTriangle}
								alt=""
								className="absolute top-0 -left-20 lg:-left-10 w-56 h-auto drop-shadow-xl"
							/>
							<img
								src={imgDots2}
								alt=""
								className="absolute bottom-40 xl:-bottom-10 left-32 xl:left-48 md:w-40 xl:w-60 h-auto drop-shadow-xl"
							/>
							<img
								src={imgOffice}
								alt=""
								className="absolute top-20 left-0 xl:left-14 w-56 h-32 xl:w-80 xl:h-48 shadow-xl"
							/>
						</div>
						<div className="col-span-3">
							<SubHeader message="What I do?" />
							<Highlight content="My expertise lies in building scalable and maintainable web applications, leveraging the latest technologies to deliver high-quality results." />
							<Text
								content="My focus is on creating decision-assistance systems and business process optimization tools. 
                I use AI models to categorize data, enhance decision-making, and automate
            workflows, ultimately driving cost reduction and efficiency."
							/>
							<TextButton
								label="Check out my experience"
								icon="fi fi-sr-angle-small-right"
								onClick={() => scrollTo(AppComponents.experience)}
							/>
						</div>
					</div>
					<div className="lg:grid lg:grid-cols-5 lg:gap-20 xl:gap-40">
						<div className="col-span-5 lg:col-span-3">
							<SubHeader message="My approach" />
							<Highlight content="I am passionate about technology and its potential to transform businesses. My approach is centered around delivering high-quality solutions that meet client needs and exceed expectations." />
							<Text content="I thrive on innovation and problem-solving, constantly seeking new ideas to improve existing systems and deliver impactful results." />
							<Text content="Creativity and collaboration are at the core of my approach. I believe in supporting my team and prioritizing collective success over individual achievements. For me, the ultimate satisfaction comes from delivering high-quality work and ensuring client happiness." />
							<Text content="My goal is to transform challenges into opportunities, always pushing the boundaries of what technology can achieve." />
							<TextButton
								label="Get in touch"
								icon="fi fi-sr-angle-small-right"
								onClick={() => scrollTo(AppComponents.contact)}
							/>
						</div>
						<div className="relative hidden lg:block col-span-2">
							<img
								src={imgDots3}
								alt=""
								className="absolute top-0 right-0 w-48 h-auto drop-shadow-xl"
							/>
							<img
								src={imgCircle}
								alt=""
								className="absolute bottom-20 -left-20 xl:-left-10 lg:-bottom-20 w-64 h-auto drop-shadow-xl"
							/>
							<img
								src={imgDoMore}
								alt=""
								className="absolute top-10 right-14 max-w-52 max-h-80 lg:w-64 lg:h-96 shadow-xl"
							/>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
}
