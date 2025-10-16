console.log("twitch oauth helper loaded")

async function startTwitchOAuth() {
   let tokenReponse = await fetch("/request_twitch_oauth_token");
   if (!tokenReponse.ok) {
        console.error("Unable to retrieve OAuth token from Twitch!");
        return null;
   }
   console.log("Test: Successfully requested Twitch OAuth Token!");
}

export default startTwitchOAuth;