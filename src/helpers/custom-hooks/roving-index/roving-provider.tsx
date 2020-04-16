import React, { createContext, ReactElement, useReducer, useMemo, useEffect } from "react";
import { Logger } from "helpers/logger.helper";
import {
	RovingState,
	RovingAction,
	Props,
	ActionTypes,
	RovingContext,
	EKeyDirection,
} from "./types.d";

const DOCUMENT_POSITION_PRECEDING = 2;

const initialState: RovingState = {
	direction: EKeyDirection.VERTICAL,
	selectedId: null,
	lastActionOrigin: null,
	tabStops: [],
};

/**
 * Actions Reducer
 *
 * @export
 * @param {RovingState} state
 * @param {RovingAction} action
 * @returns {RovingState}
 */
export function reducer(state: RovingState, action: RovingAction): RovingState {
	switch (action.type) {
		case ActionTypes.REGISTER: {
			const { tabStops } = state;
			const newTabStop = action.payload;
			if (tabStops.length === 0) {
				return {
					...state,
					selectedId: newTabStop.id,
					tabStops: [newTabStop],
				};
			}

			const index = tabStops.findIndex((tabStop) => {
				return tabStop.id === newTabStop.id;
			});

			if (index >= 0) {
				Logger({
					type: "warning",
					message: `${newTabStop.id} tab stop already registered`,
				});
				return state;
			}

			let indexToInsertAt = tabStops.findIndex(
				(tabStop) =>
					// Return true if newTabStop's element is located earlier in the DOM
					// than tabStop's element, else false:
					!!(
						tabStop.domElementRef.current.compareDocumentPosition(
							newTabStop.domElementRef.current
						) & DOCUMENT_POSITION_PRECEDING
					)
			);

			// findIndex returns -1 when newTabStop should be inserted
			// at the end of tabStops (the compareDocumentPosition test
			// always returns false in that case).
			if (indexToInsertAt === -1) {
				indexToInsertAt = tabStops.length;
			}

			return {
				...state,
				tabStops: [
					...tabStops.slice(0, indexToInsertAt),
					newTabStop,
					...tabStops.slice(indexToInsertAt),
				],
			};
		}
		case ActionTypes.UNREGISTER: {
			const { id } = action.payload;

			const filteredTabStops = state.tabStops.filter((tabStop) => tabStop.id !== id);

			if (filteredTabStops.length === state.tabStops.length) {
				Logger({
					type: "warning",
					message: `${id} tab stop already unregistered`,
				});
				return state;
			}

			return {
				...state,
				selectedId:
					state.selectedId === id
						? filteredTabStops.length === 0
							? null
							: filteredTabStops[0].id
						: state.selectedId,
				tabStops: filteredTabStops,
			};
		}
		case ActionTypes.TAB_TO_PREVIOUS:
		case ActionTypes.TAB_TO_NEXT: {
			const { id } = action.payload;
			const index = state.tabStops.findIndex((tabStop) => tabStop.id === id);

			if (index === -1) {
				Logger({
					type: "warning",
					message: `${id} tab stop not registered`,
				});
				return state;
			}

			const newIndex =
				action.type === ActionTypes.TAB_TO_PREVIOUS
					? index <= 0
						? state.tabStops.length - 1
						: index - 1
					: index >= state.tabStops.length - 1
					? 0
					: index + 1;

			return {
				...state,
				lastActionOrigin: "keyboard",
				selectedId: state.tabStops[newIndex].id,
			};
		}
		case ActionTypes.TAB_TO_FIRST:
		case ActionTypes.TAB_TO_LAST: {
			if (!state.tabStops.length) {
				return state;
			}

			const newIndex = action.type === ActionTypes.TAB_TO_FIRST ? 0 : state.tabStops.length - 1;

			return {
				...state,
				lastActionOrigin: "keyboard",
				selectedId: state.tabStops[newIndex].id,
			};
		}
		case ActionTypes.CLICKED: {
			return {
				...state,
				lastActionOrigin: "mouse",
				selectedId: action.payload.id,
			};
		}
		case ActionTypes.CHANGE_DIRECTION: {
			return {
				...state,
				direction: action.payload.direction,
			};
		}
		default:
			return state;
	}
}

export const RovingTabIndexContext = createContext<RovingContext>({
	state: {
		...initialState,
	},
	dispatch: () => {},
});

const Provider = ({ children, direction = EKeyDirection.VERTICAL }: Props): ReactElement => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const context = useMemo<RovingContext>(
		() => ({
			state,
			dispatch,
		}),
		[state]
	);

	useEffect(() => {
		dispatch({
			type: ActionTypes.CHANGE_DIRECTION,
			payload: { direction },
		});
	}, [direction, dispatch]);

	return (
		<RovingTabIndexContext.Provider value={context}>{children}</RovingTabIndexContext.Provider>
	);
};

export default Provider;
