import TwitchAPI from "/src/twitch_api/twitch_api.js";

console.log("initiate twithc oauth loaded")

function startTwitchOAuth() {
    console.log("Redirecting to twitch OAuth..");
    let twitch_api = new TwitchAPI();
    twitch_api.redirect_to_oauth();
}

export default startTwitchOAuth;