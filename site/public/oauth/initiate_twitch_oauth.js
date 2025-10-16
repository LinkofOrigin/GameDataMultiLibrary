console.log("twitch oauth helper loaded")

function startTwitchOAuth() {
   fetch("/request_twitch_oauth_token")
        .then((resp) => resp.text())
        .then((text) => {
            console.log("Received a response: " + text);
        });
}

export default startTwitchOAuth;