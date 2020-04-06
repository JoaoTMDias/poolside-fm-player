export enum EKeyDirection {
	HORIZONTAL = "horizontal",
	VERTICAL = "vertical",
	BOTH = "both",
}

export type Props = {
	children: React.ReactNode;
	direction?: KeyDirection;
};

export type KeyDirection = EKeyDirection.HORIZONTAL | EKeyDirection.VERTICAL | EKeyDirection.BOTH;

export enum ActionTypes {
	REGISTER = "REGISTER",
	UNREGISTER = "UNREGISTER",
	TAB_TO_FIRST = "TAB_TO_FIRST",
	TAB_TO_LAST = "TAB_TO_LAST",
	TAB_TO_PREVIOUS = "TAB_TO_PREVIOUS",
	TAB_TO_NEXT = "TAB_TO_NEXT",
	CLICKED = "CLICKED",
	CHANGE_DIRECTION = "CHANGE_DIRECTION",
}

export type RovingState = {
	direction: KeyDirection;
	selectedId: string | null;
	lastActionOrigin: "mouse" | "keyboard" | null;
	tabStops: Array<TabStop>;
};

export type TabStop = {
	readonly id: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly domElementRef: React.RefObject<any>;
};

interface IRovingActionPayloadID {
	id: TabStop["id"];
}

interface IRovingActionPayloadDirection {
	direction: KeyDirection;
}

interface IRovingActionWithPayload<Action, Payload> {
	type: Action;
	payload: Payload;
}

interface IRovingAction<Action> {
	type: Action;
}

export type RovingAction =
	| IRovingActionWithPayload<ActionTypes.REGISTER, TabStop>
	| IRovingActionWithPayload<ActionTypes.UNREGISTER, IRovingActionPayloadID>
	| IRovingAction<ActionTypes.TAB_TO_FIRST>
	| IRovingAction<ActionTypes.TAB_TO_LAST>
	| IRovingActionWithPayload<ActionTypes.TAB_TO_PREVIOUS, IRovingActionPayloadID>
	| IRovingActionWithPayload<ActionTypes.TAB_TO_NEXT, IRovingActionPayloadID>
	| IRovingActionWithPayload<ActionTypes.CLICKED, IRovingActionPayloadID>
	| IRovingActionWithPayload<ActionTypes.CHANGE_DIRECTION, IRovingActionPayloadDirection>;

export type RovingContext = {
	state: RovingState;
	dispatch: React.Dispatch<RovingAction>;
};
