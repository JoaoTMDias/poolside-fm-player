import { createContext, AriaAttributes } from "react";

export type AnnouncerType = "notification" | "change";

export interface IAnnouncerContext {
	text?: string;
	politeness?: AriaAttributes["aria-live"];
	onDispatchAnnounce(type: AnnouncerType, message: string): void;
}

export const defaultAnnouncerContext: IAnnouncerContext = {
	text: "",
	politeness: "polite",
	onDispatchAnnounce: () => { },
};

/**
 * @description Context for the Announcer
 * @author João Dias
 * @param {IThemeContext}
 * @returns
 */
const AnnouncerContext = createContext<IAnnouncerContext>(defaultAnnouncerContext);

export default AnnouncerContext;
