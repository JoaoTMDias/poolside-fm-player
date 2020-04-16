export interface ITabItemProps {
	id: string;
	text: string;
	ariaLabel?: string;
	disabled?: boolean;
}

export interface ITabListProps {
	children: React.ReactNode;
	ariaLabel?: string;
}

export interface ITabPanelProps {
	id: string;
}

export interface ITabs {
	children: React.ReactNode;
	initialTab?: string;
}
