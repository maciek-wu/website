interface CardProps {
	label: string;
	desc: string;
	icon?: string;
}

export default function Card({ label, desc, icon }: CardProps) {
	function renderIcon(icon?: string) {
		return icon ? (
			<div className="flex w-3/12 pb-2 justify-start items-start">
				<img src={icon} alt="" className="w-8/12" />
			</div>
		) : (
			""
		);
	}

	return (
		<div className="flex flex-row p-4 rounded-lg border border-slate-700 bg-gray-600/40 transition-colors duration-200 hover:bg-gray-700 hover:border-slate-600 hover:shadow-xl hover:cursor-pointer">
			{renderIcon(icon)}
			<div className="w-9/12">
				<h2 className="text-lg mb-2">{label}</h2>
				<p className="text-xs">{desc}</p>
			</div>
		</div>
	);
}
