/* eslint-disable @typescript-eslint/camelcase */
// eslint-disable-next-line import/no-extraneous-dependencies
import Audio from "mock-audio-element";

import {
	ISoundcloudPlaylist,
	ISoundcloudOriginalFormat,
	ISoundcloudState,
	ISoundcloudLicense,
	ISoundcloudPolicy,
	ISoundcloudUserKind,
	TrackKind,
	ISoundcloudEmbeddableBy,
	ISoundcloudMonetizationModel,
	ISoundcloudSharing,
	ISoundcloudPlayer,
} from "components/player/media-player/player.interfaces";

const audio = new Audio();

export const playlist: ISoundcloudPlaylist = {
	duration: 61858733,
	release_day: null,
	permalink_url: "https://soundcloud.com/poolsidefm/sets/poolside-fm-official-playlist",
	reposts_count: 0,
	genre: "Disco",
	permalink: "poolside-fm-official-playlist",
	purchase_url: null,
	release_month: null,
	description: "VISIT POOLSIDE.FM FOR THE SUPER-SUMMER EXPERIENCE OF A LIFETIME",
	uri: "https://api.soundcloud.com/playlists/740801463",
	label_name: null,
	tag_list: "",
	release_year: null,
	track_count: 240,
	user_id: 90064554,
	last_modified: "2019/11/10 21:59:18 +0000",
	license: ISoundcloudLicense.AllRightsReserved,
	tracks: [
		{
			comment_count: 92,
			downloadable: false,
			release: "",
			created_at: "2011/03/13 22:05:57 +0000",
			description: "",
			original_content_size: 9614466,
			title: "Pelle G - Childish Delight (Eumig & Chinon Remix)",
			track_type: "remix",
			duration: 234146,
			video_url: null,
			original_format: ISoundcloudOriginalFormat.Mp3,
			artwork_url: null,
			streamable: true,
			tag_list: "eumig 'chinon' remix 'Childish Delight' pop electronic",
			release_month: null,
			genre: "Electronic Pop",
			release_day: null,
			id: 11919925,
			state: ISoundcloudState.Finished,
			reposts_count: 0,
			last_modified: "2019/10/24 14:57:46 +0000",
			label_name: "",
			commentable: true,
			bpm: null,
			policy: ISoundcloudPolicy.Allow,
			favoritings_count: 1100,
			kind: TrackKind.Track,
			purchase_url: null,
			release_year: null,
			key_signature: "",
			isrc: "",
			sharing: ISoundcloudSharing.Public,
			uri: "https://api.soundcloud.com/tracks/11919925",
			attachments_uri: "https://api.soundcloud.com/tracks/11919925/attachments",
			download_count: 100,
			likes_count: 1100,
			license: ISoundcloudLicense.AllRightsReserved,
			purchase_title: null,
			user_id: 649509,
			embeddable_by: ISoundcloudEmbeddableBy.All,
			monetization_model: ISoundcloudMonetizationModel.NotApplicable,
			waveform_url: "https://w1.sndcdn.com/kNgLZPjMOMYK_m.png",
			permalink: "pelle-g-childish-delight-eumig",
			permalink_url: "https://soundcloud.com/eumigandchinon/pelle-g-childish-delight-eumig",
			user: {
				id: 649509,
				kind: ISoundcloudUserKind.User,
				permalink: "eumigandchinon",
				username: "Eumig & Chinon",
				last_modified: "2019/08/20 04:57:06 +0000",
				uri: "https://api.soundcloud.com/users/649509",
				permalink_url: "https://soundcloud.com/eumigandchinon",
				avatar_url: "https://i1.sndcdn.com/avatars-000000958077-0p2dyf-large.jpg",
			},
			label_id: null,
			stream_url: "https://api.soundcloud.com/tracks/11919925/stream",
			playback_count: 0,
		},
		{
			comment_count: 183,
			release: "SDCR 006",
			original_content_size: 23584562,
			track_type: "",
			original_format: ISoundcloudOriginalFormat.Mp3,
			streamable: true,
			id: 18825208,
			state: ISoundcloudState.Finished,
			last_modified: "2018/08/03 03:36:24 +0000",
			favoritings_count: 5290,
			kind: TrackKind.Track,
			purchase_url: null,
			release_year: 2011,
			sharing: ISoundcloudSharing.Public,
			attachments_uri: "https://api.soundcloud.com/tracks/18825208/attachments",
			license: ISoundcloudLicense.AllRightsReserved,
			user_id: 1076596,
			waveform_url: "https://w1.sndcdn.com/ow3Lrg6Gdadp_m.png",
			permalink: "cherokee-take-care-of-you",
			permalink_url: "https://soundcloud.com/shinydiscoclub/cherokee-take-care-of-you",
			playback_count: 0,
			downloadable: false,
			created_at: "2011/07/11 16:35:08 +0000",
			description: "description",
			title: "Cherokee - Take Care Of You",
			duration: 349781,
			video_url: "http://www.youtube.com/watch?v=wwIGreD8tYw&feature=channel_video_title",
			artwork_url: "https://i1.sndcdn.com/artworks-000009168575-oeapas-large.jpg",
			tag_list: "",
			release_month: 7,
			genre: "French House",
			release_day: 11,
			reposts_count: 0,
			label_name: "Shiny Disco Club",
			commentable: true,
			bpm: null,
			policy: ISoundcloudPolicy.Allow,
			key_signature: "",
			isrc: "",
			label: {
				id: 1076596,
				kind: ISoundcloudUserKind.User,
				permalink: "shinydiscoclub",
				username: "Shiny Disco Club",
				last_modified: "2014/11/01 03:13:56 +0000",
				uri: "https://api.soundcloud.com/users/1076596",
				permalink_url: "https://soundcloud.com/shinydiscoclub",
				avatar_url: "https://i1.sndcdn.com/avatars-000004025851-ohc7di-large.jpg",
			},
			uri: "https://api.soundcloud.com/tracks/18825208",
			download_count: 13154,
			likes_count: 5290,
			purchase_title: null,
			embeddable_by: ISoundcloudEmbeddableBy.All,
			monetization_model: ISoundcloudMonetizationModel.NotApplicable,
			user: {
				id: 1076596,
				kind: ISoundcloudUserKind.User,
				permalink: "shinydiscoclub",
				username: "Shiny Disco Club",
				last_modified: "2014/11/01 03:13:56 +0000",
				uri: "https://api.soundcloud.com/users/1076596",
				permalink_url: "https://soundcloud.com/shinydiscoclub",
				avatar_url: "https://i1.sndcdn.com/avatars-000004025851-ohc7di-large.jpg",
			},
			label_id: 1076596,
			stream_url: "https://api.soundcloud.com/tracks/18825208/stream",
		},
		{
			comment_count: 28,
			downloadable: false,
			release: "",
			created_at: "2012/10/16 17:30:46 +0000",
			description: "description",
			original_content_size: 66154956,
			title: "title",
			track_type: "remix",
			duration: 375127,
			video_url: null,
			original_format: ISoundcloudOriginalFormat.Wav,
			artwork_url: "https://i1.sndcdn.com/artworks-000032297669-tpashz-large.jpg",
			streamable: true,
			tag_list: "Laberge Definition Just don't Let Go True Love Funk Disco House",
			release_month: null,
			genre: "True Love",
			release_day: null,
			id: 63648251,
			state: ISoundcloudState.Finished,
			reposts_count: 0,
			last_modified: "2017/02/21 15:17:14 +0000",
			label_name: "",
			commentable: true,
			bpm: null,
			policy: ISoundcloudPolicy.Allow,
			favoritings_count: 309,
			kind: TrackKind.Track,
			purchase_url: "http://www.mediafire.com/?ptdou3pev9nynow",
			release_year: null,
			key_signature: "",
			isrc: "",
			sharing: ISoundcloudSharing.Public,
			uri: "https://api.soundcloud.com/tracks/63648251",
			attachments_uri: "https://api.soundcloud.com/tracks/63648251/attachments",
			download_count: 149,
			likes_count: 309,
			license: ISoundcloudLicense.AllRightsReserved,
			purchase_title: null,
			user_id: 16746849,
			embeddable_by: ISoundcloudEmbeddableBy.All,
			monetization_model: ISoundcloudMonetizationModel.NotApplicable,
			waveform_url: "https://w1.sndcdn.com/Vmi0KKenUA5R_m.png",
			permalink: "laberge-just-dont-let-go",
			permalink_url: "https://soundcloud.com/definitionpowa/laberge-just-dont-let-go",
			user: {
				id: 16746849,
				kind: ISoundcloudUserKind.User,
				permalink: "definitionpowa",
				username: "Definition",
				last_modified: "2016/05/29 13:06:32 +0000",
				uri: "https://api.soundcloud.com/users/16746849",
				permalink_url: "https://soundcloud.com/definitionpowa",
				avatar_url: "https://i1.sndcdn.com/avatars-000091846688-9iplvg-large.jpg",
			},
			label_id: null,
			stream_url: "https://api.soundcloud.com/tracks/63648251/stream",
			playback_count: 0,
		},
		{
			comment_count: 107,
			release: "",
			original_content_size: 10948087,
			track_type: "original",
			original_format: ISoundcloudOriginalFormat.Mp3,
			streamable: true,
			download_url: "https://api.soundcloud.com/tracks/92575485/download",
			id: 92575485,
			state: ISoundcloudState.Finished,
			last_modified: "2019/06/27 13:13:23 +0000",
			favoritings_count: 1501,
			kind: TrackKind.Track,
			purchase_url: null,
			release_year: null,
			sharing: ISoundcloudSharing.Public,
			attachments_uri: "https://api.soundcloud.com/tracks/92575485/attachments",
			license: ISoundcloudLicense.AllRightsReserved,
			user_id: 1099828,
			waveform_url: "https://w1.sndcdn.com/thAz8o5IpO52_m.png",
			permalink: "too-young",
			permalink_url: "https://soundcloud.com/basementlove/too-young",
			playback_count: 0,
			downloadable: true,
			created_at: "2013/05/17 02:18:46 +0000",
			description: "description",
			title: "Too Young",
			duration: 273710,
			video_url: null,
			artwork_url: null,
			tag_list: "",
			release_month: null,
			genre: "Slow House",
			release_day: null,
			reposts_count: 0,
			label_name: "",
			commentable: true,
			bpm: null,
			policy: ISoundcloudPolicy.Allow,
			key_signature: "",
			isrc: "",
			uri: "https://api.soundcloud.com/tracks/92575485",
			download_count: 4719,
			likes_count: 1501,
			purchase_title: null,
			embeddable_by: ISoundcloudEmbeddableBy.All,
			monetization_model: ISoundcloudMonetizationModel.NotApplicable,
			user: {
				id: 1099828,
				kind: ISoundcloudUserKind.User,
				permalink: "basementlove",
				username: "Basement Love",
				last_modified: "2019/09/20 00:56:35 +0000",
				uri: "https://api.soundcloud.com/users/1099828",
				permalink_url: "https://soundcloud.com/basementlove",
				avatar_url: "https://i1.sndcdn.com/avatars-000095318752-le8ae4-large.jpg",
			},
			label_id: null,
			stream_url: "https://api.soundcloud.com/tracks/92575485/stream",
		},
		{
			comment_count: 85,
			downloadable: false,
			release: "",
			created_at: "2013/07/01 05:00:55 +0000",
			description: "",
			original_content_size: 12633947,
			title: "Fleetwood Mac - Dreams (Gigamesh Edit)",
			track_type: "",
			duration: 315849,
			video_url: null,
			original_format: ISoundcloudOriginalFormat.Mp3,
			artwork_url: null,
			streamable: true,
			tag_list: "",
			release_month: null,
			genre: "",
			release_day: null,
			id: 99174097,
			state: ISoundcloudState.Finished,
			reposts_count: 0,
			last_modified: "2019/10/31 09:03:49 +0000",
			label_name: "",
			commentable: true,
			bpm: null,
			policy: ISoundcloudPolicy.Allow,
			favoritings_count: 25761,
			kind: TrackKind.Track,
			purchase_url: null,
			release_year: null,
			key_signature: "",
			isrc: "",
			sharing: ISoundcloudSharing.Public,
			uri: "https://api.soundcloud.com/tracks/99174097",
			attachments_uri: "https://api.soundcloud.com/tracks/99174097/attachments",
			download_count: 100,
			likes_count: 25761,
			license: ISoundcloudLicense.AllRightsReserved,
			purchase_title: null,
			user_id: 49672101,
			embeddable_by: ISoundcloudEmbeddableBy.All,
			monetization_model: ISoundcloudMonetizationModel.NotApplicable,
			waveform_url: "https://w1.sndcdn.com/2tfhhyAksoQN_m.png",
			permalink: "dreams-gigamesh-edit-mp3",
			permalink_url: "https://soundcloud.com/4040creative/dreams-gigamesh-edit-mp3",
			user: {
				id: 49672101,
				kind: ISoundcloudUserKind.User,
				permalink: "4040creative",
				username: "4040Creative",
				last_modified: "2016/09/05 06:21:06 +0000",
				uri: "https://api.soundcloud.com/users/49672101",
				permalink_url: "https://soundcloud.com/4040creative",
				avatar_url: "https://i1.sndcdn.com/avatars-000046167268-x7ecna-large.jpg",
			},
			label_id: null,
			stream_url: "https://api.soundcloud.com/tracks/99174097/stream",
			playback_count: 0,
		},
		{
			comment_count: 216,
			release: "",
			original_content_size: 73503238,
			track_type: "",
			original_format: ISoundcloudOriginalFormat.Wav,
			streamable: true,
			download_url: "https://api.soundcloud.com/tracks/106030779/download",
			id: 106030779,
			state: ISoundcloudState.Finished,
			last_modified: "2019/09/14 12:27:48 +0000",
			favoritings_count: 8063,
			kind: TrackKind.Track,
			purchase_url: null,
			release_year: null,
			sharing: ISoundcloudSharing.Public,
			attachments_uri: "https://api.soundcloud.com/tracks/106030779/attachments",
			license: ISoundcloudLicense.AllRightsReserved,
			user_id: 3261233,
			waveform_url: "https://w1.sndcdn.com/p2XI2vYm6rSS_m.png",
			permalink: "brownstone-if-you-love-me",
			permalink_url: "https://soundcloud.com/chloexmartini/brownstone-if-you-love-me",
			playback_count: 0,
			downloadable: true,
			created_at: "2013/08/18 19:03:21 +0000",
			description: "artwork by Szejku www.facebook.com/szejku",
			title: "Brownstone - If You Love Me (Chloe Martini Remix)",
			duration: 277890,
			video_url: null,
			artwork_url: "https://i1.sndcdn.com/artworks-000073365871-f58nsk-large.jpg",
			tag_list: "",
			release_month: null,
			genre: "sayit",
			release_day: null,
			reposts_count: 0,
			label_name: "",
			commentable: true,
			bpm: null,
			policy: ISoundcloudPolicy.Allow,
			key_signature: "",
			isrc: "",
			uri: "https://api.soundcloud.com/tracks/106030779",
			download_count: 1692,
			likes_count: 8063,
			purchase_title: null,
			embeddable_by: ISoundcloudEmbeddableBy.All,
			monetization_model: ISoundcloudMonetizationModel.NotApplicable,
			user: {
				id: 3261233,
				kind: ISoundcloudUserKind.User,
				permalink: "chloexmartini",
				username: "Chloe Martini",
				last_modified: "2019/10/17 15:43:31 +0000",
				uri: "https://api.soundcloud.com/users/3261233",
				permalink_url: "https://soundcloud.com/chloexmartini",
				avatar_url: "https://i1.sndcdn.com/avatars-000651738546-a7udo5-large.jpg",
			},
			label_id: null,
			stream_url: "https://api.soundcloud.com/tracks/106030779/stream",
		},
		{
			comment_count: 107,
			downloadable: false,
			release: "",
			created_at: "2013/12/18 18:25:50 +0000",
			description: "another original composition with 'the message' sample\r\nmore @ http://espritfantasy.bandcamp.com",
			original_content_size: 1812188,
			title: "ESPRIT 空想 - esprit",
			track_type: "",
			duration: 75370,
			video_url: null,
			original_format: ISoundcloudOriginalFormat.Mp3,
			artwork_url: "https://i1.sndcdn.com/artworks-000065699280-gswn23-large.jpg",
			streamable: true,
			tag_list: "",
			release_month: null,
			genre: "12-bit",
			release_day: null,
			id: 125452512,
			state: ISoundcloudState.Finished,
			reposts_count: 0,
			last_modified: "2019/11/02 21:52:51 +0000",
			label_name: "",
			commentable: true,
			bpm: null,
			policy: ISoundcloudPolicy.Allow,
			favoritings_count: 3785,
			kind: TrackKind.Track,
			purchase_url: null,
			release_year: null,
			key_signature: "",
			isrc: "",
			sharing: ISoundcloudSharing.Public,
			uri: "https://api.soundcloud.com/tracks/125452512",
			attachments_uri: "https://api.soundcloud.com/tracks/125452512/attachments",
			download_count: 100,
			likes_count: 3785,
			license: ISoundcloudLicense.AllRightsReserved,
			purchase_title: null,
			user_id: 29920829,
			embeddable_by: ISoundcloudEmbeddableBy.All,
			monetization_model: ISoundcloudMonetizationModel.NotApplicable,
			waveform_url: "https://w1.sndcdn.com/UT19qQCv86P0_m.png",
			permalink: "esprit-esprit",
			permalink_url: "https://soundcloud.com/espritfantasy/esprit-esprit",
			user: {
				id: 29920829,
				kind: ISoundcloudUserKind.User,
				permalink: "espritfantasy",
				username: "ESPRIT 空想",
				last_modified: "2018/10/04 22:45:32 +0000",
				uri: "https://api.soundcloud.com/users/29920829",
				permalink_url: "https://soundcloud.com/espritfantasy",
				avatar_url: "https://i1.sndcdn.com/avatars-000125808250-ip1ds1-large.jpg",
			},
			label_id: null,
			stream_url: "https://api.soundcloud.com/tracks/125452512/stream",
			playback_count: 0,
		},
		{
			comment_count: 11,
			downloadable: false,
			release: "",
			created_at: "2014/08/21 00:46:44 +0000",
			description: "free download here: https://www.facebook.com/WeAreSoftTouch/app_220150904689418",
			original_content_size: 9878547,
			title: "Get on Up - feat. Kianah [FREE DOWNLOAD]",
			track_type: "",
			duration: 247036,
			video_url: null,
			original_format: ISoundcloudOriginalFormat.Mp3,
			artwork_url: "https://i1.sndcdn.com/artworks-000093859055-qbmbq7-large.jpg",
			streamable: true,
			tag_list: "description",
			release_month: 10,
			genre: "original",
			release_day: 12,
			id: 164051341,
			state: ISoundcloudState.Finished,
			reposts_count: 0,
			last_modified: "2015/09/20 10:14:15 +0000",
			label_name: "",
			commentable: true,
			bpm: null,
			policy: ISoundcloudPolicy.Allow,
			favoritings_count: 361,
			kind: TrackKind.Track,
			purchase_url: "https://www.facebook.com/WeAreSoftTouch/app_220150904689418",
			release_year: 2014,
			key_signature: "",
			isrc: "",
			sharing: ISoundcloudSharing.Public,
			uri: "https://api.soundcloud.com/tracks/164051341",
			attachments_uri: "https://api.soundcloud.com/tracks/164051341/attachments",
			download_count: 42,
			likes_count: 361,
			license: ISoundcloudLicense.AllRightsReserved,
			purchase_title: "DOWNLOAD",
			user_id: 1541551,
			embeddable_by: ISoundcloudEmbeddableBy.All,
			monetization_model: ISoundcloudMonetizationModel.NotApplicable,
			waveform_url: "https://w1.sndcdn.com/RNlfebLk55Vn_m.png",
			permalink: "get-on-up",
			permalink_url: "https://soundcloud.com/soft-touch/get-on-up",
			user: {
				id: 1541551,
				kind: ISoundcloudUserKind.User,
				permalink: "soft-touch",
				username: "Soft Touch",
				last_modified: "2015/06/18 17:30:11 +0000",
				uri: "https://api.soundcloud.com/users/1541551",
				permalink_url: "https://soundcloud.com/soft-touch",
				avatar_url: "https://i1.sndcdn.com/avatars-000108036616-bd9bue-large.jpg",
			},
			label_id: null,
			stream_url: "https://api.soundcloud.com/tracks/164051341/stream",
			playback_count: 0,
		},
		{
			comment_count: 5,
			downloadable: false,
			release: null,
			created_at: "2014/09/09 17:46:46 +0000",
			description:
				"Monster 80's Funk banger in its  instrumental version. This is brought to you by the Boogie80 team.",
			original_content_size: 56800844,
			title: "GLASS - Let Me Feel Your Heartbeat (Instrumental) 1982",
			track_type: null,
			duration: 322092,
			video_url: null,
			original_format: ISoundcloudOriginalFormat.Wav,
			artwork_url: "https://i1.sndcdn.com/artworks-000090527659-n0xh93-large.jpg",
			streamable: true,
			tag_list: "description",
			release_month: null,
			genre: "80's Funk",
			release_day: null,
			id: 166961152,
			state: ISoundcloudState.Finished,
			reposts_count: 0,
			last_modified: "2015/12/11 02:12:19 +0000",
			label_name: null,
			commentable: true,
			bpm: null,
			policy: ISoundcloudPolicy.Allow,
			favoritings_count: 170,
			kind: TrackKind.Track,
			purchase_url: null,
			release_year: null,
			key_signature: null,
			isrc: null,
			sharing: ISoundcloudSharing.Public,
			uri: "https://api.soundcloud.com/tracks/166961152",
			attachments_uri: "https://api.soundcloud.com/tracks/166961152/attachments",
			download_count: 0,
			likes_count: 170,
			license: ISoundcloudLicense.AllRightsReserved,
			purchase_title: null,
			user_id: 59743564,
			embeddable_by: ISoundcloudEmbeddableBy.All,
			monetization_model: ISoundcloudMonetizationModel.NotApplicable,
			waveform_url: "https://w1.sndcdn.com/5BURlGs5uKbW_m.png",
			permalink: "glass-let-me-feel-your-heartbeat-instrumental-1982",
			permalink_url: "https://soundcloud.com/boogie80-com/glass-let-me-feel-your-heartbeat-instrumental-1982",
			user: {
				id: 59743564,
				kind: ISoundcloudUserKind.User,
				permalink: "boogie80-com",
				username: "Boogie80",
				last_modified: "2018/12/22 18:21:39 +0000",
				uri: "https://api.soundcloud.com/users/59743564",
				permalink_url: "https://soundcloud.com/boogie80-com",
				avatar_url: "https://i1.sndcdn.com/avatars-000438576696-w2o1n8-large.jpg",
			},
			label_id: null,
			stream_url: "https://api.soundcloud.com/tracks/166961152/stream",
			playback_count: 0,
		},
		{
			comment_count: 9,
			downloadable: false,
			release: null,
			created_at: "2014/09/19 08:00:58 +0000",
			description: "description",
			original_content_size: 34701370,
			title: "BRENTON WOOD - You're The Girl Of My Dreams (1986)",
			track_type: null,
			duration: 196771,
			video_url: null,
			original_format: ISoundcloudOriginalFormat.Wav,
			artwork_url: "https://i1.sndcdn.com/artworks-000091479037-970eb4-large.jpg",
			streamable: true,
			tag_list: "description",
			release_month: null,
			genre: "80's Soul",
			release_day: null,
			id: 168407828,
			state: ISoundcloudState.Finished,
			reposts_count: 0,
			last_modified: "2018/01/26 09:51:27 +0000",
			label_name: null,
			commentable: true,
			bpm: null,
			policy: ISoundcloudPolicy.Allow,
			favoritings_count: 382,
			kind: TrackKind.Track,
			purchase_url: null,
			release_year: null,
			key_signature: null,
			isrc: null,
			sharing: ISoundcloudSharing.Public,
			uri: "https://api.soundcloud.com/tracks/168407828",
			attachments_uri: "https://api.soundcloud.com/tracks/168407828/attachments",
			download_count: 6,
			likes_count: 382,
			license: ISoundcloudLicense.AllRightsReserved,
			purchase_title: null,
			user_id: 59743564,
			embeddable_by: ISoundcloudEmbeddableBy.All,
			monetization_model: ISoundcloudMonetizationModel.NotApplicable,
			waveform_url: "https://w1.sndcdn.com/HPjXfUZsC9gE_m.png",
			permalink: "brenton-wood-youre-the-girl-of-my-dreams-1986",
			permalink_url: "https://soundcloud.com/boogie80-com/brenton-wood-youre-the-girl-of-my-dreams-1986",
			user: {
				id: 59743564,
				kind: ISoundcloudUserKind.User,
				permalink: "boogie80-com",
				username: "Boogie80",
				last_modified: "2018/12/22 18:21:39 +0000",
				uri: "https://api.soundcloud.com/users/59743564",
				permalink_url: "https://soundcloud.com/boogie80-com",
				avatar_url: "https://i1.sndcdn.com/avatars-000438576696-w2o1n8-large.jpg",
			},
			label_id: null,
			stream_url: "https://api.soundcloud.com/tracks/168407828/stream",
			playback_count: 0,
		},
		{
			comment_count: 47,
			downloadable: false,
			release: null,
			created_at: "2015/10/12 17:48:35 +0000",
			description:
				"NEW EP — 'ODYSSÉE' \nvinyl 12\" ~ bit.ly/ODYSSEE_vinyl\niTunes ~ bit.ly/ODYSSEE_itunes\nDeezer ~ bit.ly/ODYSSEE_deez\nSpotify ~ bit.ly/ODYSSEE_spotify\n\nfacebook.com/Je.Suis.Imperatrice\n\n//\nFREE DOWNLOAD → j.mp/VanilleFraise_free\n\nmgmt/ Antoine Bigot — antoine@microqosmos.com\nbooking/ Talent Boutique — claire@thetalentboutique.fr\n\n♕\n\nLYRICS / PAROLES — AGITATIONS TROPICALES\n\nCortège en partance \nVers des latitudes impudiques\nÉclabousser l’éminence\nPacifique\n\nMonarque ingénue et fière\nElle seule domine\nL’assemblée, docile, chemine\nVers son parfum thérémine\n\nAgitations tropicales\nCréatures astrales\nCourtisanes en transe\nSoupirants de l’Élégance idéale\n\nAgitations tropicales\nSymphonie spatiale\nL’équipage avance \nÉpousant l’exubérance impériale\n\nFuir les apparences futiles\nLes beautés mécaniques\nPardonner la décadence\nOrganique\n\nSous son écorce impassible\nOn devine\nSa lascivité mutine\nSa tendresse libertine\n\nAgitations tropicales\nCréatures astrales\nCourtisanes en transe\nSoupirants de l’élégance idéale\n\nAgitations tropicales\nSymphonie spatiale\nL’équipage avance épousant l’exubérance impériale\n\n♕",
			original_content_size: 9960317,
			title: "L'Impératrice — AGITATIONS TROPICALES",
			track_type: null,
			duration: 249021,
			video_url: null,
			original_format: ISoundcloudOriginalFormat.Mp3,
			artwork_url: "https://i1.sndcdn.com/artworks-000132492181-f2giwc-large.jpg",
			streamable: true,
			tag_list: "odyssee",
			release_month: null,
			genre: "limperatrice",
			release_day: null,
			id: 228081685,
			state: ISoundcloudState.Finished,
			reposts_count: 0,
			last_modified: "2019/05/24 02:52:09 +0000",
			label_name: "L'Impératrice",
			commentable: true,
			bpm: null,
			policy: ISoundcloudPolicy.Monetize,
			favoritings_count: 7038,
			kind: TrackKind.Track,
			purchase_url: "https://itunes.apple.com/fr/album/odyssee-ep/id1042056075",
			release_year: null,
			key_signature: null,
			isrc: null,
			sharing: ISoundcloudSharing.Public,
			uri: "https://api.soundcloud.com/tracks/228081685",
			attachments_uri: "https://api.soundcloud.com/tracks/228081685/attachments",
			download_count: 0,
			likes_count: 7038,
			license: ISoundcloudLicense.AllRightsReserved,
			purchase_title: null,
			user_id: 89391040,
			embeddable_by: ISoundcloudEmbeddableBy.All,
			monetization_model: ISoundcloudMonetizationModel.AdSupported,
			waveform_url: "https://w1.sndcdn.com/90NrPOiMhsDp_m.png",
			permalink: "l-imperatrice_agitations-tropicales",
			permalink_url: "https://soundcloud.com/l-imperatrice/l-imperatrice_agitations-tropicales",
			user: {
				id: 89391040,
				kind: ISoundcloudUserKind.User,
				permalink: "l-imperatrice",
				username: "L'Impératrice ♕",
				last_modified: "2019/06/07 15:50:44 +0000",
				uri: "https://api.soundcloud.com/users/89391040",
				permalink_url: "https://soundcloud.com/l-imperatrice",
				avatar_url: "https://i1.sndcdn.com/avatars-000638965230-b53n92-large.jpg",
			},
			label_id: null,
			stream_url: "https://api.soundcloud.com/tracks/228081685/stream",
			playback_count: 0,
		},
	],
	playlist_type: null,
	id: 740801463,
	downloadable: null,
	sharing: ISoundcloudSharing.Public,
	created_at: "2019/03/29 15:46:54 +0000",
	release: null,
	likes_count: 327,
	kind: "playlist",
	title: "poolside.fm (Official Playlist)",
	type: null,
	purchase_title: null,
	artwork_url: "https://i1.sndcdn.com/artworks-000572643257-qqkzx9-large.jpg",
	ean: null,
	streamable: null,
	user: {
		permalink_url: "https://soundcloud.com/poolsidefm",
		permalink: "poolsidefm",
		username: "Poolside FM",
		uri: "https://api.soundcloud.com/users/90064554",
		last_modified: "2019/08/27 16:01:14 +0000",
		id: 90064554,
		kind: ISoundcloudUserKind.User,
		avatar_url: "https://i1.sndcdn.com/avatars-000548536686-zmo81o-large.jpg",
	},
	embeddable_by: ISoundcloudEmbeddableBy.None,
	label_id: null,
};

export const player: ISoundcloudPlayer = {
	_events: {},
	_clientId: "xkpqYPmDf6KG7aL1xM4qfWaJQrHBLSOh",
	_baseUrl: "https://api.soundcloud.com",
	playing: "https://api.soundcloud.com/tracks/405609924/stream?client_id=xkpqYPmDf6KG7aL1xM4qfWaJQrHBLSOh",
	duration: 61858.733,
	audio,
	_playlist: playlist,
	_playlistIndex: 224,
};

export default playlist;
