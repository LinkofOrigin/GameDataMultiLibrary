import TwitchAPI from "./twitch_oauth";

export default async function requestTwitchOauthToken(request, env, ctx) {
	let twitchApi = new TwitchAPI();
	
	console.log("Env: " + JSON.stringify(env));
	const oauthClientId = env.IGDB_API_CLIENT_ID;
	const oauthClientSecret = env.IGDB_API_CLIENT_SECRET;
	
	console.log("Attempting to retrieve access token from Twitch.");
	let response = await twitchApi.request_oauth_token(oauthClientId, oauthClientSecret);
	console.log("Received response from Twitch with OAuth token");
	console.log(response);
	return response;
}