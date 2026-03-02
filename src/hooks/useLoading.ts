import { useEffect, useState } from "react";

export const useLoading = () => {
	const [loading, setLoading] = useState(true);
	const isLoaded = () => {
		if (document.readyState === "complete") {
			setTimeout(() => setLoading(false), 2000);
			return true;
		}
		return false;
	};

	useEffect(() => {
		const loadPage = () => {
			if (isLoaded()) {
				return;
			}
			document.onreadystatechange = () => {
				isLoaded();
			};
		};
		loadPage();
	}, []);

	return { loading };
};
