import React, { useState, FunctionComponent } from "react";
import AnnouncerContext, { IAnnouncerContext, AnnouncerType, defaultAnnouncerContext } from "contexts/announcer-context";


const AnnouncerContextProvider: FunctionComponent = ({ children }) => {
	const [text, setText] = useState(defaultAnnouncerContext.text);
	const [politeness, setPoliteness] = useState<IAnnouncerContext["politeness"]>(defaultAnnouncerContext.politeness);

	/**
	 * * When the user dispaatches a new message:
	 * - If the type is "notification", changes the aria-live to "assertive", since it needs to be announced over others.
	 * - If it is "change", changes the aria-live to "polite"
	 *
	 * @param {AnnouncerType} type
	 * @param {string} message
	 * @returns {void}
	 */
	function handleChangeAnnouncer(type: AnnouncerType, message: string): void {
		switch (type) {
			case "notification":
				setPoliteness("assertive");
				break;

			case "change":
				setPoliteness("polite");
				break;

			default:
				break;

		}

		setText(message);
	}

	const context: IAnnouncerContext = {
		text,
		politeness,
		onDispatchAnnounce: (type, message) => handleChangeAnnouncer(type, message),
	};

	return <AnnouncerContext.Provider value={context}>{children}</AnnouncerContext.Provider>;
};

export default AnnouncerContextProvider;
