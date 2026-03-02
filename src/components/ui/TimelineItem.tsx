import Badge from "./Badge";

export interface TimelineItemProps {
	title: string;
	subTitle: string;
	dateSpan: string;
	description: string;
	tags: string[];
	lastItem?: boolean;
}

export default function TimelineItem({
	title,
	subTitle,
	dateSpan,
	description,
	tags,
	lastItem = false,
}: TimelineItemProps) {
	return (
		<div className="flex gap-x-3 group" key={title}>
			<div
				className={`relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:-translate-x-[0.5px] after:border-s after:border-line-2 ${
					lastItem ? "border-gradient-transparent" : "after:border-slate-700"
				}`}
			>
				<div className="relative z-10 size-7 flex justify-center items-center">
					<div className="size-2 rounded-full bg-slate-700 group-hover:bg-theme-blue"></div>
				</div>
			</div>

			<div className="grow pt-0.5 pb-8">
				<h3 className="flex gap-x-1.5 font-medium">
					<span className="font-semibold text-slate-300">{title}</span> /{" "}
					{subTitle}
				</h3>
				<div className="my-2 text-md text-theme-blue">{dateSpan}</div>
				<div className="mb-4 mt-2 text-sm">{description}</div>
				<div className="flex flex-wrap md:flex-row gap-4 w-full justify-start">
					{tags.map((tag) => (
						<Badge label={tag} key={tag} />
					))}
				</div>
			</div>
		</div>
	);
}
