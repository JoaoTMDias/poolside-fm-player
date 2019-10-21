export interface ISelectOption {
	id: string;
	label: string;
	value: string;
}

export interface ISelectProps {
	id: string;
	label?: string;
	options: ISelectOption[];
	placeholder?: string;
	onSelectOption?: (option: ISelectOption) => void;
}

export interface ISelectState {
	isOpen: boolean;
	selectButton: ISelectOption;
}
