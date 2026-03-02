import { useEffect, useState } from "react";
import { getTimelineItems } from "../utils/api.service";
import { AppComponents, TimelineItemData } from "../utils/definitions";
import Feedback from "./Feedback";
import Header from "./ui/Header";
import Section from "./ui/Section";
import SubHeader from "./ui/SubHeader";
import Timeline from "./ui/Timeline";
import TimelineItem from "./ui/TimelineItem";

export default function Experience() {
	const [items, setItems] = useState<TimelineItemData[]>([]);

	async function loadItems() {
		const items = await getTimelineItems();
		if (items.length) {
			setItems(items);
		}
	}

	useEffect(() => {
		loadItems();
	}, []);

	return (
		<Section
			id={AppComponents.experience}
			bgColor="bg-grid-upper bg-no-repeat bg-top bg-cover"
		>
			<div className="flex flex-wrap justify-start items-center text-left">
				<div className="w-full lg:w-10/12">
					<div className="w-full">
						<Header message="Experience" />
					</div>
					<div className="mb-10">
						<SubHeader message="Timeline" />
						<Timeline>
							{items.map((item, idx) => (
								<TimelineItem
									title={item.title}
									subTitle={item.subTitle}
									dateSpan={item.dateSpan}
									description={item.description}
									tags={item.skills.map((s) => s.name)}
									key={idx}
									lastItem={idx === items.length - 1}
								/>
							))}
						</Timeline>
					</div>
					<Feedback />
				</div>

				<div className="hidden lg:block w-2/12"></div>
			</div>
		</Section>
	);
}
