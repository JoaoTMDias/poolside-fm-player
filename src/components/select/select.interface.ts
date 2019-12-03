import { ISelectOption } from "data/constants";

export interface ISelectProps {
	id: string;
	label?: string;
	currentIndex: number;
	options: ISelectOption[];
	placeholder?: string;
	onChange?: (index: number) => void;
}

export interface ISelectState {
	isOpen: boolean;
}
