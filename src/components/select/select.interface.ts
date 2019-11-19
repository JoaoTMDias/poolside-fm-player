import { IPoolsidePlaylist } from "data/constants/playlists.constants";

export interface ISelectProps {
	id: string;
	label?: string;
	options: IPoolsidePlaylist[];
	placeholder?: string;
	onSelectOption?: (option: IPoolsidePlaylist) => void;
}

export interface ISelectState {
	isOpen: boolean;
}
