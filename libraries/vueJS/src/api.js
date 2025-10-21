import TwitchAPI from "./twitch_api/twitch_api";
import IGDB_Helper from "./igdb_api/IGDB_Helper.js";

export function getCredentials() {
    console.log("Retrieving client ID and client secret");
    console.log(`process: ${JSON.stringify(process)}`);
    const credentials = {
        clientId: process.env.VITE_CLIENT_ID,
        clientSecret: process.env.VITE_CLIENT_SECRET
    };
    return credentials;
}

export async function getAPIToken(clientId, clientSecret) {
    console.log("Requesting API token from Twitch");
    const twichApi = new TwitchAPI();
    const apiTokenResult = await twichApi.requestOauthToken(clientId, clientSecret);
    return apiTokenResult.access_token;
}

export async function getGenreData(clientId, apiToken) {
    console.log("Pulling game data from IGDB");
    const igdb = new IGDB_Helper();
    const igdbRequest = igdb.createRequest(clientId, apiToken);

    igdbRequest
        .fields("name", "release_dates")
        .limit(6);

    const responseData = await igdbRequest.request("/genres")
        .then(async (result) => {
            if (result.status !== 200) {
                console.log("Unexpected response from IGDB! Received: " + await result.text());
                throw new Error("Received bad result from IGDB API!");
            }

            return result.data;
        })
        .then((data) => {
            console.log("Successfully retrieved data from IGDB API.");
            return data;
        });

    return responseData;
}

export async function getGameData(clientId, apiToken) {
    console.log("Pulling game data from IGDB");
    const igdb = new IGDB_Helper();
    const igdbRequest = igdb.createRequest(clientId, apiToken);

    igdbRequest
        .fields("name", "summary")
        .limit(3);

    const responseData = await igdbRequest.request("/games")
        .then(async (result) => {
            if (result.status !== 200) {
                console.log("Unexpected response from IGDB! Received: " + await result.text());
                throw new Error("Received bad result from IGDB API!");
            }

            return result.data;
        })
        .then((data) => {
            console.log("Successfully retrieved data from IGDB API.");
            return data;
        });

    return responseData;
}

export async function getCharacterData(clientId, apiToken) {
    console.log("Pulling game data from IGDB");
    const igdb = new IGDB_Helper();
    const igdbRequest = igdb.createRequest(clientId, apiToken);

    const randomPageNum = Math.floor(Math.random() * 1000); // 1000 is arbitrary, no idea how many total pages their will be

    igdbRequest
        .fields("name", "games.name")
        .offset(randomPageNum)
        .limit(5);

    const responseData = await igdbRequest.request("/characters")
        .then(async (result) => {
            if (result.status !== 200) {
                console.log("Unexpected response from IGDB! Received: " + await result.text());
                throw new Error("Received bad result from IGDB API!");
            }

            return result.data;
        })
        .then((data) => {
            console.log("Successfully retrieved data from IGDB API.");
            return data;
        });

    return responseData;
}