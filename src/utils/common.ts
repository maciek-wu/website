export const targetInside = (
	target: EventTarget,
	element: HTMLElement,
): boolean => {
	return element && element.contains(target as Node);
};

export const throttle = <T extends (...args: any[]) => any>(
	func: T,
	delay: number,
): ((...args: Parameters<T>) => void) => {
	let lastCall = 0;
	return (...args: Parameters<T>) => {
		const now = new Date().getTime();
		if (now - lastCall < delay) {
			return;
		}
		lastCall = now;
		return func(...args);
	};
};

export const pause = (delay: number) => {
	return new Promise((resolve) => setTimeout(resolve, delay));
};

export const getRandValue = (arr: any[]): any => {
	return arr[Math.floor(Math.random() * arr.length)];
};

export const createCursor = () => {
	const existingCursor = document.getElementById("custom-cursor");
	if (existingCursor) {
		existingCursor.classList.remove("hovered");
		return;
	}

	const targets =
		'a, button, input[type="submit"], input[type="button"], [role="button"], .button, .badge';
	const cursor = document.createElement("div");
	const dot = document.createElement("div");
	cursor.id = "custom-cursor";
	dot.id = "cursor-dot";
	cursor.appendChild(dot);
	document.body.appendChild(cursor);

	const moveCursor = (e: MouseEvent) => {
		cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
	};
	const addHover = () => cursor.classList.add("hovered");
	const removeHover = () => cursor.classList.remove("hovered");

	window.addEventListener("mousemove", throttle(moveCursor, 10));
	document.body.addEventListener("mouseover", (e) => {
		if (!e.target) return;
		const target = e.target as HTMLElement;
		if (target.closest(targets)) {
			addHover();
		}
	});
	document.body.addEventListener("mouseout", (e) => {
		if (!e.target) return;
		const target = e.target as HTMLElement;
		if (target.closest(targets)) {
			removeHover();
		}
	});
};

export const addStyle = (tokens: string[], element: HTMLElement | null) => {
	if (!element) return;

	for (const token of tokens) {
		if (!element.classList.contains(token)) {
			element.classList.add(token);
		}
	}
};

export const removeStyle = (tokens: string[], element: HTMLElement | null) => {
	if (!element) return;

	for (const token of tokens) {
		if (element.classList.contains(token)) {
			element.classList.remove(token);
		}
	}
};

export const replaceStyle = (
	token: string,
	newToken: string,
	element: HTMLElement | null,
) => {
	if (!element) return;

	removeStyle([token], element);
	addStyle([newToken], element);
};

export const isMobile = () => {
	return window.innerWidth <= 768;
};
