/**
 * Docs: https://developers.cloudflare.com/workers/
 */
import requestTwitchOauthToken from "./twitch_oauth/request_token";

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		switch (url.pathname) {
			
			case "/request_twitch_oauth_token":
				let token = await requestTwitchOauthToken(request, env, ctx);
				console.log("Got a response for twitch token");
				return new Response(token);
			
			case '/message':
				return new Response('Hello, Worker!');
			
			case '/random':
				return new Response(crypto.randomUUID());
			
			default:
				return new Response('Gorbldy', { status: 404 });
		}
	},
};
