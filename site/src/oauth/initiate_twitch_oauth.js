import TwitchAPI from "../twitch_api/twitch_api";

function start_twitch_oauth() {
    let twitch_api = new TwitchAPI();
    twitch_api.redirect_to_oauth();
}

export default start_twitch_oauth;