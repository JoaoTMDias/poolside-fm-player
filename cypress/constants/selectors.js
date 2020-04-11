export const SELECTORS = {
	status: "data-playing-status",
	visualizer: {
		label: "component-player-visualizer-label",
	},
	playlist: {
		button: {
			element: "component-select-button",
			title: "#channel-title",
		},
	},
	player: {
		metadata: {
			wrapper: "component-current-song",
			title: ".current-song__title",
			artist: ".current-song__artist",
			time: {
				initial: ".current-song__time__initial",
			},
		},
		buttons: {
			play: "component-controls-media-button-play",
			previous: "component-controls-media-button-previous",
			next: "component-controls-media-button-next",
			volume: "component-controls-media-button-volume",
			settings: "component-controls-button-settings",
		},
	},
};
