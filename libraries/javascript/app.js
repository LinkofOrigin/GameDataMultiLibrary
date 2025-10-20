import IGDB_Helper from "./src/igdb/igdb_api.js";
import TwitchAPI from "./src/twitch_oauth/twitch_oauth.js";
import fs from 'fs';

function getCredentials() {
    console.log("Retrieving client ID and client secret");
    const secrets = fs.readFileSync("./secrets.json");
    const secretsJSON = JSON.parse(secrets);
    return secretsJSON;
}

async function getAPIToken(clientId, clientSecret) {
    console.log("Requesting API token from Twitch");
    const twichApi = new TwitchAPI();
    const apiTokenResult = await twichApi.requestOauthToken(clientId, clientSecret);
    return apiTokenResult.access_token;
}

async function getGameData(clientId, apiToken) {
    console.log("Pulling game data from IGDB");
    const igdb = new IGDB_Helper();
    const igdbRequest = igdb.createRequest(clientId, apiToken);

    igdbRequest
        .fields("name, release_dates")
        .limit(1);

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

const credentials = getCredentials();
const token = await getAPIToken(credentials.clientId, credentials.clientSecret);
const gameData = await getGameData(credentials.clientId, token);

const firstGame = gameData[0];
const firstGameName = firstGame.name;
let firstGameRelease = new Date(firstGame.release_dates[0]);
firstGameRelease = firstGameRelease.toLocaleDateString();
console.log(`Retrieved game ${firstGameName} released at ${firstGameRelease}`);
