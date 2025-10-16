import IGDB_API from "./igdb_api";
import { ensureOAuthToken } from "../twitch_oauth/request_token";

async function getGenreData(igdb) {
    let endpoint = "genres";
    let fields = ["name", "slug", "updated_at"];
    let filters = {
        limit: 5,
    };
    
    let genreResponse = await igdb.request(endpoint, fields, filters);
    // console.log("Received genre data from IGDB: " + genreResponse);
    return genreResponse;
}

async function getSecondaryGamesData(igdb) {
    return "NULL";
}

async function getTertiaryData(igdb) {
    return "NULL";
}

export default async function requestGameData(request, env, ctx) {
    // Ensure we have a valid access token stored that we can use to make API calls
    await ensureOAuthToken(request, env, ctx);
    
    let clientId = env.IGDB_API_CLIENT_ID;
    let accessToken = await env.IGDB.get("ACCESS_TOKEN");
    let igdbApi = new IGDB_API(clientId, accessToken);
    
    let genreData = await getGenreData(igdbApi);
    let secondaryData = await getSecondaryGamesData(igdbApi);
    let tertiaryData = await getTertiaryData(igdbApi);
    console.log("Retrieved various data from IGDB.");
    
    return {
        "genres": genreData,
        "secondary": secondaryData,
        "tertiary": tertiaryData
    }
}