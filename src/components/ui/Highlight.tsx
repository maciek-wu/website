import Text from "./Text";

interface HighlightProps {
	content: string;
}
export default function Highlight({ content }: HighlightProps) {
	return (
		<div className="text-theme-blue text-lg">
			<Text content={content} textSize="text-lg" />
		</div>
	);
}
