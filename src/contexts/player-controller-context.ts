import React from "react";
import { EPlayingStatus } from "components/player/media-player/player.interfaces";

export interface IPlayerControllerTrack {
	current: number;
	last: number;
}
export interface IPlayerControllerState {
	track: IPlayerControllerTrack;
	currentPlaylistIndex: number;
	currentTime: number;
	status: EPlayingStatus;
	duration: number;
	artist: string;
	title: string;
	previous: () => void;
	next: () => void;
	togglePlay: () => void;
	changeVolume: () => void;
	changePlaylist: (index: number) => void;
}

export const defaultPlayerControllerState = {
	track: {
		current: 0,
		last: 0,
	},
	currentPlaylistIndex: 0,
	currentTime: 0,
	status: EPlayingStatus.paused,
	duration: 0,
	artist: "We'll be right back",
	title: "Loading...",
	previous: () => {},
	next: () => {},
	togglePlay: () => {},
	changeVolume: () => {},
	changePlaylist: () => {},
};

/**
 * @description Context for Player Controller
 * @author João Dias
 * @param {IPlayerControllerState}
 * @returns
 * @memberof SidebarPortal
 */
export const PlayerControllerContext = React.createContext<IPlayerControllerState>(defaultPlayerControllerState);

export default PlayerControllerContext;
