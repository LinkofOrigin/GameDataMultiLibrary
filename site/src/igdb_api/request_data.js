import IGDB_API from "./igdb_api";
import { ensureOAuthToken } from "../twitch_oauth/request_token";

// Get a list of Genres registered with IGDB
async function getPrimaryData(igdb) {
    let endpoint = "genres";
    let fields = [
        "name",
        "updated_at",
    ];
    let filters = {
        limit: 5,
    };
    
    let genreResponse = await igdb.request(endpoint, fields, filters);
    console.log("Retrieved primary data from IGDB.");
    return genreResponse;
}

// Get Games from IGDB with few but high ratings (gems)
async function getSecondaryData(igdb) {
    let endpoint = "games";
    let fields = [
        "name",
        "summary",
        "aggregated_rating",
        "aggregated_rating_count",
        "updated_at",
    ];
    let filters = {
        where: "aggregated_rating > 70 & aggregated_rating_count <= 100 & aggregated_rating_count > 10",
        limit: 5,
    };
    
    let genreResponse = await igdb.request(endpoint, fields, filters);
    console.log("Retrieved secondary data from IGDB.");
    return genreResponse;
}

// Get 5 random characters (alphabetized)
async function getTertiaryData(igdb) {
    let endpoint = "characters";
    let fields = [
        "name",
        "games.name",
        "updated_at",
        "description",
    ];
    
    const randomPageNum = Math.floor(Math.random() * 1000); // 1000 is arbitrary, no idea how many total pages their will be
    
    let filters = {
        sort: "name asc",
        where: "games != null",
        limit: 5,
        offset: randomPageNum,
    };
    
    let genreResponse = await igdb.request(endpoint, fields, filters);
    console.log("Retrieved tertiary data from IGDB.");
    return genreResponse;
}

export default async function requestGameData(request, env, ctx) {
    // Ensure we have a valid access token stored that we can use to make API calls
    await ensureOAuthToken(request, env, ctx);
    
    let clientId = env.IGDB_API_CLIENT_ID;
    let accessToken = await env.IGDB.get("ACCESS_TOKEN");
    let igdbApi = new IGDB_API(clientId, accessToken);
    
    let primaryData = await getPrimaryData(igdbApi);
    let secondaryData = await getSecondaryData(igdbApi);
    let tertiaryData = await getTertiaryData(igdbApi);
    console.log("Retrieved various data from IGDB.");
    
    // Wrap up our return data into some objects with notable fields
    return {
        "primary": {
            "title": "Genres",
            "summary": "5 genres the API returns (no order or sort logic).",
            "data": primaryData,
        },
        "secondary": {
            "title": "Games",
            "summary": "5 games with a high average rating but relatively few total ratings. Maybe your next favorite game is here?",
            "data": secondaryData,
        },
        "tertiary": {
            "title": "Characters",
            "summary": "5 characters with at least one associated game. These characters were selected by sorting their names alphabetically and then pulling a random page number.",
            "data": tertiaryData,
        },
    }
}