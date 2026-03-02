import { PropsWithChildren, useCallback, useState } from "react";
import { useUtil } from "../../../hooks/useUtil";

interface TiltEffectProps extends PropsWithChildren {
	className: string;
}

export default function TiltEffect({ className, children }: TiltEffectProps) {
	const { throttle } = useUtil();
	const [rotate, setRotate] = useState({ x: 0, y: 0 });

	const onMouseMove = useCallback(
		throttle((e: React.MouseEvent<HTMLDivElement>) => {
			const card = e.currentTarget;
			const box = card.getBoundingClientRect();
			const x = e.clientX - box.left;
			const y = e.clientY - box.top;
			const centerX = box.width / 2;
			const centerY = box.height / 2;
			const rotateX = (y - centerY) / 30;
			const rotateY = (centerX - x) / 70;

			setRotate({ x: rotateX, y: rotateY });
		}, 100),
		[],
	);

	const onMouseLeave = () => {
		setRotate({ x: 0, y: 0 });
	};

	return (
		<div
			className={`${className} transition-[all_500ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] duration-500 will-change-transform`}
			onMouseMove={onMouseMove}
			onMouseLeave={onMouseLeave}
			style={{
				transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
				transition: "all 500ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
			}}
		>
			{children}
		</div>
	);
}
