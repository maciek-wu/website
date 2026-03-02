import { useEffect, useState } from "react";
import { useUtil } from "../hooks/useUtil";
import { getSkills, groupSkills, sortSkills } from "../utils/api.service";
import { AppComponents, Skill, SkillGroup } from "../utils/definitions";
import Projects from "./Projects";
import Badge from "./ui/Badge";
import Header from "./ui/Header";
import ProgressBar from "./ui/ProgressBar";
import Section from "./ui/Section";
import SubHeader from "./ui/SubHeader";
import Text from "./ui/Text";

export default function Skills() {
	const { isMobile } = useUtil();
	const [skills, setSkills] = useState<Skill[]>([]);
	const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([]);
	const [groupedSkills, setGroupedSkills] = useState<Record<string, Skill[]>>();

	async function loadSkills() {
		const skills = await getSkills();

		if (skills.length) {
			const sorted = sortSkills(skills);
			const { groups, grouped } = groupSkills(sorted);
			setSkills(sorted);
			setGroupedSkills(grouped);
			setSkillGroups(groups);
		}
	}

	function renderCategoryGroups() {
		if (!skillGroups.length || !groupedSkills) return;

		return skillGroups.map((group, idx) => {
			const skills = groupedSkills[group.name];
			return (
				<div
					className={`flex flex-col ${isMobile() ? "w-1/4" : "w-1/8"}`}
					key={idx}
				>
					<h3 className="mb-2 text-lg text-slate-300 capitalize">
						{group.name}
					</h3>
					{skills.map(
						(skill, idx) =>
							skill.progress && (
								<div className="mb-4 hover:text-slate-300" key={idx}>
									<ProgressBar label={skill.name} progress={skill.progress} />
								</div>
							),
					)}
				</div>
			);
		});
	}

	useEffect(() => {
		loadSkills();
	}, []);

	return (
		<Section id={AppComponents.skills} style="pt-20">
			<div className="text-left">
				<Header message="Skills" />
			</div>
			<div className="lg:grid lg:grid-cols-3 lg:gap-10 xl:gap-20 w-full mb-6 text-left md:justify-between">
				<div className="w-full">
					<SubHeader message="Technology path" />
					<Text
						content="My career began with telematics and scoring systems. 
          I was also involved in designing databases for collecting and processing large amounts of data, mainly MSSQL."
					/>
					<Text content="Then I participated in the creation of web and mobile applications. I was also creating automation using the n8n tool." />
					<Text
						content="The popularization and commercialization of LLMs had a major turning point in my career. 
            That's when I joined projects focused on using AI in tools that optimize daily tasks and reduce costs for our clients. 
            I learned many new technologies and approaches that I still use today."
					/>
					<Text content="I am constantly learning and using the latest techniques and technologies to improve my work." />
				</div>
				<div className="w-full col-span-2">
					<SubHeader message="Skills and tools" />
					<div className="flex flex-wrap gap-4 w-full mb-4 justify-start">
						{skills &&
							skills.map((skill, idx) => (
								<Badge label={skill.name} key={idx} />
							))}
					</div>
				</div>
			</div>
			<div className="md:flex md:flex-col w-full text-left ">
				<SubHeader message="Progress" />
				<div className="flex flex-wrap gap-10 w-full justify-start">
					{renderCategoryGroups()}
				</div>
			</div>
			<Projects />
		</Section>
	);
}
