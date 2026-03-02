import { PropsWithChildren } from "react";

export default function TopNavItem({ children }: PropsWithChildren) {
	return <li className="block md:mx-10 my-auto last:md:mr-0">{children}</li>;
}
