import Button from "./ui/Button";

interface ResumeProps {
	label?: string;
}

export default function Resume({ label = "Resume" }: ResumeProps) {
	function handleClick() {
		window.open("/resume.pdf", "_blank");
	}

	return <Button type="button" label={label} onClick={handleClick} />;
}
