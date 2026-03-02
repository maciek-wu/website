import { PropsWithChildren } from "react";

interface TimelineProps extends PropsWithChildren {}

export default function Timeline({ children }: TimelineProps) {
	return <div className="w-full">{children}</div>;
}
