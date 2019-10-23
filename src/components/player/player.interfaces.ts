export enum EPlayingStatus {
	playing = "playing",
	paused = "paused",
}

export interface IAudioPlayerProps {
	src: string;
}

export interface IAudioPlayerState {
	player: HTMLAudioElement | null;
	status: EPlayingStatus;
}

export interface IControlsMediaProps {
	onClickOnPrevious?: () => void;
	onClickOnPlay?: () => void;
	onClickOnNext?: () => void;
	onClickOnVolume?: () => void;
	onClickOnSettings?: () => void;
	status: EPlayingStatus;
}
