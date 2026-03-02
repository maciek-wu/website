import {
	addStyle,
	getRandValue,
	isMobile,
	pause,
	removeStyle,
	replaceStyle,
	targetInside,
	throttle,
} from "../utils/common";
import player from "../utils/player";

export const useUtil = () => {
	return {
		addStyle,
		removeStyle,
		replaceStyle,
		targetInside,
		throttle,
		getRandValue,
		pause,
		player,
		isMobile,
	};
};
