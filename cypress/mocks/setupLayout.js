import { WINDOW_WIDTH, WINDOW_HEIGHT } from "../../src/data/constants/native";
import { DEFAULT_TIMEOUT } from "../constants/timeouts";

const API_RESOLVE =
	"https://api.soundcloud.com/resolve.json?url=https%3A%2F%2Fsoundcloud.com%2Fpoolsidefm%2Fsets%2Fpoolside-fm-official-playlist&client_id=1df3275a3b94dfba2d1d4fac65562601";
const API_POOLSIDE_FM_PLAYLIST_URL =
	"https://api.soundcloud.com/playlists/740801463.json?client_id=1df3275a3b94dfba2d1d4fac65562601";

/**
 * Default Mocks
 */
export const DEFAULT_REQUESTS_MOCKS = {
	getSoundcloudResolve: {
		method: "GET",
		url: API_RESOLVE,
		response: "poolsidefm",
		mock: "getSoundcloudResolve",
	},
	getPoolsideFMOfficialPlaylist: {
		method: "GET",
		url: API_POOLSIDE_FM_PLAYLIST_URL,
		response: "poolsidefm",
		mock: "getPoolsideFMOfficialPlaylist",
	},
};

const { getSoundcloudResolve, getPoolsideFMOfficialPlaylist } = DEFAULT_REQUESTS_MOCKS;

const setupLayout = (url = Cypress.config().baseUrl) => {
	cy.log("Setting environment server");
	cy.server();
	cy.visit(url);
	cy.route({
		method: getSoundcloudResolve.method,
		url: getSoundcloudResolve.url,
		status: 200,
		response: getSoundcloudResolve.response,
	}).as(getSoundcloudResolve.mock);
	cy.route({
		method: getPoolsideFMOfficialPlaylist.method,
		url: getPoolsideFMOfficialPlaylist.url,
		status: 200,
		response: getPoolsideFMOfficialPlaylist.response,
	}).as(getPoolsideFMOfficialPlaylist.mock);
	cy.viewport(WINDOW_WIDTH, WINDOW_HEIGHT);
	cy.wait(DEFAULT_TIMEOUT);
};

export { setupLayout };
