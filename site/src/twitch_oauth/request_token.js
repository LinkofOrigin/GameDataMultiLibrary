import TwitchAPI from "./twitch_api";

export async function ensureOAuthToken(request, env, ctx) {
	let twitchApi = new TwitchAPI();
	
	const currentAccessToken = await env.IGDB.get("ACCESS_TOKEN");
	
	let accessToken = currentAccessToken;
	console.log("Current access token: " + accessToken);
	if (accessToken != null && accessToken != "") {
		// We have a token, now validate it
		console.log("Validating Twitch Access Token.")
		let validTokenResponse = await twitchApi.validateAccessToken(accessToken);
		
		// If invalid, refresh it
		if (validTokenResponse.status == 401) {
			console.log("Previous Twitch OAuth token is now invalid, attempting refresh.")
			const newTokenResponse = await requestTwitchOauthToken(request, env, ctx);
			accessToken = newTokenResponse.access_token;
	
			// Store the token in our KV environment
			env.IGDB.put("ACCESS_TOKEN", accessToken);
			console.log("Stored Twitch access token successfully.")
		}
		
	}
	else {
		// If already invalid, get a new one
		console.log("Attempting to acquire fresh Twitch OAuth token.")
		const newTokenResponse = await requestTwitchOauthToken(request, env, ctx);
		accessToken = newTokenResponse.access_token;
	
		// Store the token in our KV environment
		env.IGDB.put("ACCESS_TOKEN", accessToken);
		console.log("Stored Twitch access token successfully.")
	}
	
	if (accessToken == null || accessToken == "") {
		throw new Error("Failed to validate and refresh access token! Received empty token!");
	}
	
	console.log("Successfully validated Access token.");
}

export default async function requestTwitchOauthToken(request, env, ctx) {
	let twitchApi = new TwitchAPI();
	
	const oauthClientId = env.IGDB_API_CLIENT_ID;
	const oauthClientSecret = env.IGDB_API_CLIENT_SECRET;
	
	console.log("Attempting to retrieve access token from Twitch.");
	let response = await twitchApi.requestOauthToken(oauthClientId, oauthClientSecret);
	console.log("Received response from Twitch with OAuth token");
	
	// console.log(response);
	
	let accessToken = response.access_token;
	
	return response;
}