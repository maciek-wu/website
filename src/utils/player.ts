import { pause } from "./common";

const player = {
	loaded: false,
	isPlaying: false,
	audio: {} as HTMLAudioElement,
	load(url: string) {
		this.audio = new Audio(url);
		this.loaded = true;
	},
	play(volume?: number) {
		if (!this.loaded) return;
		if (volume) {
			this.audio.volume = volume;
		}
		this.audio.play();
		this.isPlaying = true;
	},
	pause() {
		if (!this.loaded || !this.isPlaying) return;
		this.audio.pause();
	},
	async volumeDown() {
		if (!this.loaded || !this.isPlaying) return;
		let volume = this.audio.volume;
		const step = volume / 3;
		while (volume <= 0) {
			console.log(`volume ${volume}`);
			volume -= step;
			this.audio.volume = volume;
			console.log(`new volume ${this.audio.volume}`);
			await pause(500);
		}
	},
};

export default player;
