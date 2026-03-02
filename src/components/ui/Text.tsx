interface TextProps {
	content: string;
	textSize?: string;
}

export default function Text({ content, textSize = "text-sm" }: TextProps) {
	return (
		<p className={`mb-4 ${textSize} text-shadow tracking-wide`}>{content}</p>
	);
}
