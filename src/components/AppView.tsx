import { PropsWithChildren } from "react";

export default function AppView({ children }: PropsWithChildren) {
	return (
		<div className="flex flex-col w-full text-slate-400 bg-theme-dark antialiased overflow-hidden">
			{children}
		</div>
	);
}
