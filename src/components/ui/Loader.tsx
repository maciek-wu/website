import imgLoader from "../../assets/img/loader.svg";

interface LoaderProps {
	label: string;
}

export default function Loader({ label }: LoaderProps) {
	return (
		<div className="mt-4">
			<div className="flex flex-row text-sm">
				<img className="mr-2" src={imgLoader} width={24} alt="" />
				{label} ...
			</div>
		</div>
	);
}
