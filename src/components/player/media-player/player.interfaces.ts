export interface IMediaPlayerTrackMetadata {
	title: string;
	artist: string;
}

export enum EPlayingStatus {
	playing = "playing",
	paused = "paused",
	loading = "loading",
	ready = "ready",
	error = "error",
	idle = "idle",
}

export enum ESoundCloudPlayerEvents {
	ended = "ended",
	canplay = "canplay",
	load = "load",
	loadeddata = "loadeddata",
	loadedmetadata = "loadedmetadata",
	loadend = "loadend",
	loadstart = "loadstart",
	pause = "pause",
	play = "play",
	playing = "playing",
	seeked = "seeked",
	seeking = "seeking",
	timeupdate = "timeupdate",
	volumechange = "volumechange",
	waiting = "waiting",
}

export enum ESoundcloudPlayerPreloadType {
	none = "none",
	metadata = "metadata",
	auto = "auto",
}

export interface IMediaPlayerProps {
	currentIndex: number;
}

export interface IMediaPlayerState {
	ready: boolean;
	status: EPlayingStatus;
}

export interface IControlsMediaProps {
	onClickOnPrevious?: () => void;
	onTogglePlay?: () => void;
	onClickOnNext?: () => void;
	onChangeVolume?: (value: number) => void;
	status?: EPlayingStatus;
}

interface ISoucloudPlayerMethodsPlay {
	streamUrl?: string;
	playlistIndex?: number;
}

export interface ISoundcloudPlayer {
	events?: any;
	_events?: any;
	_baseUrl: string;
	_clientId: string;
	_playlist: ISoundcloudPlaylist;
	_playlistIndex: number;
	_track?: any;

	/**
	 * Instance of raw <audio> element. There are several useful properties like currentTime (in seconds) or events
	 * you may want to listen with addEventListener (the full list of of them at
	 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement).
	 */
	audio: HTMLAudioElement;

	/**
	 * SoundCloud track duration converted into seconds in order to be in sync with audio.currentTime.
	 */
	duration: number;

	/**
	 * Shows the current state of the player, returns false or source of a currently streaming track.

	 */
	playing: string;

	/**
	 * If you don't have SoundCloud stream_url (e.g. https://api.soundcloud.com/tracks/:id/stream) or
	 * you need track's metadata then this method is for you. Pass original track's or playlist's url as a first argument.
	 * Once data will be resolved without errors, callback function will receive it as plain object as the only argument.
	 */
	resolve?: (url: string, callback: (playlist: ISoundcloudPlaylist) => void) => void;

	/**
	 * Start playing track if it's not playing right now.
	 * Returns a Promise and accepts options object:
	 * - options.streamUrl - any audio streaming url string (e.g. SoundCloud track's stream_url),
	 * if it's passed it will be the main playing source.
	 * - options.playlistIndex - number that specifies the position of the track to play in resolved
	 * SoundCloud playlist's tracks array.
	 */
	play?: (options?: ISoucloudPlayerMethodsPlay) => Promise<any>;

	/**
	 * Pause playing audio.
	 */
	pause?: () => void;

	/**
	 * Stop playing audio and rewind it to start.
	 */
	stop?: () => void;

	/**
	 * Skip to the next track in playlist to play.
	 * Returns a Promise and accepts options object:
	 * - options.loop - boolean, if set to true will start at the beginning of a playlist after the last track.
	 */
	next?: (options?: { loop: boolean }) => Promise<any>;

	/**
	 * Return to the previous track in playlist (returns a Promise).
	 */
	previous?: () => Promise<any>;

	/**
	 * Preload track data without playing it.
	 *
	 * - preloadType - this attribute is intended to provide a hint to the browser about what the author thinks will lead
	 * to the best user experience. It may have one of the following values:
	 * 	1. 'none' - indicates that the audio should not be preloaded
	 * 	2. 'metadata' - indicates that only audio metadata (e.g. length) is fetched
	 * 	3. 'auto' - indicates that the whole audio file could be downloaded, even if the user is not expected to use it
	 *
	 * see more at https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio#Attributes
	 */
	preload?: (streamUrl: string, preloadType: ESoundcloudPlayerPreloadType) => void;
	seek?: any;
	on?: (event: ESoundCloudPlayerEvents, handler: () => void) => void;
	off?: (event: ESoundCloudPlayerEvents, handler: () => void) => void;
	unbindAll?: () => void;
}

export interface ISoundcloudPlaylist {
	duration: number;
	release_day: string | null;
	permalink_url: string;
	reposts_count: number;
	genre: string | null;
	permalink: string;
	purchase_url: string | null;
	release_month: string | null;
	description: string | null;
	uri: string;
	label_name: string | null;
	tag_list: string;
	release_year: string | null;
	track_count: number;
	user_id: number;
	last_modified: string;
	license: ISoundcloudLicense;
	tracks: ISoundcloudTrack[];
	playlist_type: string | null;
	id: number;
	downloadable: string | null;
	sharing: ISoundcloudSharing;
	created_at: string;
	release: string | null;
	likes_count: number;
	kind: string | string;
	title: string | string;
	type: string | null;
	purchase_title: string | null;
	artwork_url: string | null;
	ean: string | null;
	streamable: boolean | null;
	user: ISoundcloudUser;
	embeddable_by: ISoundcloudEmbeddableBy;
	label_id: string | number | null;
}

export enum ISoundcloudEmbeddableBy {
	All = "all",
	None = "none",
}

export enum ISoundcloudLicense {
	AllRightsReserved = "all-rights-reserved",
	CcBy = "cc-by",
	CcByNc = "cc-by-nc",
	CcByNcSa = "cc-by-nc-sa",
}

export enum ISoundcloudSharing {
	Public = "public",
}

export interface ISoundcloudTrack {
	comment_count: number;
	downloadable: boolean;
	release: null | string;
	created_at: string;
	description: null | string;
	original_content_size: number;
	title: string;
	track_type: null | string;
	duration: number;
	video_url: string | null;
	original_format: ISoundcloudOriginalFormat;
	artwork_url: null | string;
	streamable: boolean;
	tag_list: string;
	release_month: number | null;
	genre: string;
	release_day: number | null;
	id: number;
	state: ISoundcloudState;
	reposts_count: number;
	last_modified: string;
	label_name: null | string;
	commentable: boolean;
	bpm: null;
	policy: ISoundcloudPolicy;
	favoritings_count: number;
	kind: TrackKind;
	purchase_url: null | string;
	release_year: number | null;
	key_signature: null | string;
	isrc: null | string;
	label?: {
		id: number;
		kind: ISoundcloudUserKind;
		permalink: string;
		username: string;
		last_modified: string;
		uri: string;
		permalink_url: string;
		avatar_url: string;
	};
	sharing: ISoundcloudSharing;
	uri: string;
	attachments_uri: string;
	download_count: number;
	likes_count: number;
	license: ISoundcloudLicense;
	purchase_title: null | string;
	user_id: number;
	embeddable_by: ISoundcloudEmbeddableBy;
	monetization_model: ISoundcloudMonetizationModel;
	waveform_url: string;
	permalink: string;
	permalink_url: string;
	user: ISoundcloudUser;
	label_id: number | null;
	stream_url: string;
	playback_count: number;
	download_url?: string;
}

export enum TrackKind {
	Track = "track",
}

export enum ISoundcloudMonetizationModel {
	AdSupported = "AD_SUPPORTED",
	Blackbox = "BLACKBOX",
	NotApplicable = "NOT_APPLICABLE",
}

export enum ISoundcloudOriginalFormat {
	Aiff = "aiff",
	Mp3 = "mp3",
	Wav = "wav",
}

export enum ISoundcloudPolicy {
	Allow = "ALLOW",
	Monetize = "MONETIZE",
}

export enum ISoundcloudState {
	Finished = "finished",
}

export interface ISoundcloudUser {
	id: number;
	kind: ISoundcloudUserKind;
	permalink: string;
	username: string;
	last_modified: string;
	uri: string;
	permalink_url: string;
	avatar_url: string;
}

export enum ISoundcloudUserKind {
	User = "user",
	Track = "track",
}
