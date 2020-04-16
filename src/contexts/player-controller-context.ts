import React from "react";
import { EPlayingStatus } from "components/player/media-player/player.interfaces";

export interface IPlayerControllerTrack {
	current: number;
	last: number;
}

export interface IPlayerControllerState {
	track: IPlayerControllerTrack;
	currentIndex: number;
	currentTime: number;
	status: EPlayingStatus;
	duration: number;
	artist: string;
	title: string;
	previous: () => void;
	next: () => void;
	togglePlay: () => void;
	changeVolume: (volume: number) => void;
	onChangeOption: (index: number) => void;
}

export interface IPlayerControllerContext extends IPlayerControllerState {
	audio: HTMLAudioElement | null;
}

export const defaultPlayerControllerState = {
	track: {
		current: 0,
		last: 0,
	},
	currentIndex: 0,
	currentTime: 0,
	status: EPlayingStatus.idle,
	duration: 0,
	artist: "No artist",
	title: "No title",
	previous: () => {},
	next: () => {},
	togglePlay: () => {},
	changeVolume: () => {},
	onChangeOption: () => {},
};

export const defaultPlayerControllerContext = {
	...defaultPlayerControllerState,
	audio: null,
};

/**
 * @description Context for Player Controller
 * @author João Dias
 * @param {IPlayerControllerState}
 * @returns
 * @memberof SidebarPortal
 */
export const PlayerControllerContext = React.createContext<IPlayerControllerContext>(
	defaultPlayerControllerContext
);

export default PlayerControllerContext;
