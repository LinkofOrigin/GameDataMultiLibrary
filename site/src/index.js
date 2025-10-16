/**
 * Docs: https://developers.cloudflare.com/workers/
 */
import requestTwitchOauthToken from "./twitch_oauth/request_token";
import requestGameData from "./igdb_api/request_data";

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		switch (url.pathname) {
			
			case "/request_twitch_oauth_token":
				let token = await requestTwitchOauthToken(request, env, ctx);
				console.log("Got a response for twitch token");
				return new Response("Successfully retrieved and stored Twitch OAuth token.");
				
			
			case "/get_idgb_data":
				console.log("Worker attempting to retrieve game data");
				let gameData = await requestGameData(request, env, ctx);
				console.log("Worker received game data: " + JSON.stringify(gameData));
				return new Response(JSON.stringify(gameData));
				
			case '/message':
				return new Response('Hello, Worker!');
			
			case '/random':
				return new Response(crypto.randomUUID());
			
			default:
				return new Response('Not Found', { status: 404 });
		}
	},
};
