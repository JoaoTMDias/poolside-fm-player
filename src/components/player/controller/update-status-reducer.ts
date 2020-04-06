import { defaultPlayerControllerState } from "contexts/player-controller-context";
import { EPlayingStatus } from "../media-player/player.interfaces";

export type STATUS_ACTION_TYPE = "PLAY" | "PAUSE" | "LOAD" | "READY" | "ERROR" | "IDLE";
export interface IUpdateTrackAction {
	type: STATUS_ACTION_TYPE;
}

/**
 * Updates the track info depending on its type
 *
 * @param {IUpdateTrackAction} action
 * @returns
 */
export function updateStatusReducer(
	state = defaultPlayerControllerState.status,
	action: IUpdateTrackAction
): EPlayingStatus {
	switch (action.type) {
		case "PLAY":
			return EPlayingStatus.playing;

		case "PAUSE":
			return EPlayingStatus.paused;

		case "LOAD":
			return EPlayingStatus.loading;

		case "READY":
			return EPlayingStatus.ready;

		case "ERROR":
			return EPlayingStatus.error;

		case "IDLE":
		default:
			return state;
	}
}
