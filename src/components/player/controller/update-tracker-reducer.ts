import { IPlayerControllerTrack } from "contexts/player-controller-context";

export type UPDATE_TRACK_ACTION_TYPE = "CURRENT" | "LAST" | "TRACK";
export interface IUpdateTrackAction {
	type: UPDATE_TRACK_ACTION_TYPE;
	payload: number | IPlayerControllerTrack;
}

/**
 * Updates the track info depending on its type
 *
 * @param {IPlayerControllerTrack} state
 * @param {IUpdateTrackAction} action
 * @returns
 */
export function updateTrackReducer(
	state: IPlayerControllerTrack,
	action: IUpdateTrackAction
): IPlayerControllerTrack {
	switch (action.type) {
		case "CURRENT":
			return {
				...state,
				current: action.payload as number,
			};

		case "LAST":
			return {
				...state,
				last: action.payload as number,
			};

		case "TRACK":
			return {
				...state,
				...(action.payload as IPlayerControllerTrack),
			};

		default:
			return state;
	}
}
