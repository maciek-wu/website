import { useEffect, useRef, useState } from "react";
import { useUtil } from "../../../hooks/useUtil";

interface StarObject {
	x: number;
	y: number;
	z: number;
	color: string;
}

export default function SpaceBackground() {
	const { getRandValue } = useUtil();
	const starColors = [
		"#fff",
		"#fff",
		"#fff",
		"#fff",
		"#fff",
		"#fff",
		"#ffffdf",
		"#edb497",
		"#a8dcea",
		"#caf2fc",
		"#e3edf7",
	];
	const starSizes = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 3];
	const starMinScale = 0.2;
	const starCount = (window.innerWidth + window.innerHeight) / 32;
	const overflowThreshold = 50;
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [context, setContext] = useState<CanvasRenderingContext2D>();

	let animationId: number | undefined = undefined;
	let scale = 1, // device pixel ratio
		width = 0,
		height = 0;
	let stars: StarObject[] = [];
	let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0001 };

	function generate() {
		for (let i = 0; i < starCount; i++) {
			stars.push({
				x: 0,
				y: 0,
				z: starMinScale + Math.random() * (1 - starMinScale),
				color: getRandValue(starColors),
			});
		}
	}

	function placeStar(star: StarObject) {
		star.x = Math.random() * width;
		star.y = Math.random() * height;
	}

	function recycleStar(star: StarObject) {
		let direction = "z";
		let vx = Math.abs(velocity.x),
			vy = Math.abs(velocity.y);

		if (vx > 1 || vy > 1) {
			let axis;

			if (vx > vy) {
				axis = Math.random() < vx / (vx + vy) ? "h" : "v";
			} else {
				axis = Math.random() < vy / (vx + vy) ? "v" : "h";
			}

			if (axis === "h") {
				direction = velocity.x > 0 ? "l" : "r";
			} else {
				direction = velocity.y > 0 ? "t" : "b";
			}
		}

		star.z = starMinScale + Math.random() * (1 - starMinScale);

		if (direction === "z") {
			star.z = 0.1;
			star.x = Math.random() * width;
			star.y = Math.random() * height;
		} else if (direction === "l") {
			star.x = -overflowThreshold;
			star.y = height * Math.random();
		} else if (direction === "r") {
			star.x = width + overflowThreshold;
			star.y = height * Math.random();
		} else if (direction === "t") {
			star.x = width * Math.random();
			star.y = -overflowThreshold;
		} else if (direction === "b") {
			star.x = width * Math.random();
			star.y = height + overflowThreshold;
		}
	}

	function resize(canvas: HTMLCanvasElement) {
		scale = window.devicePixelRatio || 1;
		width = window.innerWidth * scale;
		height = window.innerHeight * scale;
		canvas.width = width;
		canvas.height = height;

		for (const star of stars) {
			placeStar(star);
		}
	}

	function step() {
		if (!context) {
			return;
		}

		context.clearRect(0, 0, width, height);

		update();
		render();
		animationId = requestAnimationFrame(step);
	}

	function update() {
		velocity.tx *= 0.96;
		velocity.ty *= 0.96;

		velocity.x += (velocity.tx - velocity.x) * 0.8;
		velocity.y += (velocity.ty - velocity.y) * 0.8;

		for (const star of stars) {
			star.x += velocity.x * star.z;
			star.y += velocity.y * star.z;

			star.x += (star.x - width / 2) * velocity.z * star.z;
			star.y += (star.y - height / 2) * velocity.z * star.z;
			star.z += velocity.z;

			// recycle when out of bounds
			if (
				star.x < -overflowThreshold ||
				star.x > width + overflowThreshold ||
				star.y < -overflowThreshold ||
				star.y > height + overflowThreshold
			) {
				recycleStar(star);
			}
		}
	}

	function render() {
		if (!context) {
			return;
		}

		for (const star of stars) {
			context.beginPath();
			context.lineCap = "round";
			context.lineWidth = getRandValue(starSizes) * star.z * scale;
			context.globalAlpha = 0.5 + 0.5 * Math.random();
			// TODO: fix change color on every update
			context.strokeStyle = star.color;
			context.beginPath();
			context.moveTo(star.x, star.y);

			let tailX = velocity.x * 2;
			let tailY = velocity.y * 2;

			// stroke() wont work on an invisible line
			if (Math.abs(tailX) < 0.1) tailX = 0.5;
			if (Math.abs(tailY) < 0.1) tailY = 0.5;

			context.lineTo(star.x + tailX, star.y + tailY);

			context.stroke();
		}
	}

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}

		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		if (!ctx) {
			return;
		}

		setContext(ctx);
		generate();
		resize(canvas);
		step();

		window.addEventListener("resize", () => resize(canvas));

		return () => {
			window.removeEventListener("resize", () => resize(canvas));
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
		};
	}, [canvasRef.current]);

	return (
		<>
			<canvas
				ref={canvasRef}
				className={`fixed w-full h-full bg-space bg-cover bg-center`}
			></canvas>
			<div className="absolute z-20 bottom-0 right-0 p-5 text-xs text-slate-400">
				This stunning photo was provided by{" "}
				<a href="https://www.nasa.gov/" target="_blank">
					NASA
				</a>
			</div>
		</>
	);
}
