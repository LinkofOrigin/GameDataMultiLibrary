import axios from "axios";
const TWITCH_API_ROOT = "https://id.twitch.tv/";
const TWITCH_API_OAUTH_TOKEN = "oauth2/token";
const TWITCH_API_OAUTH_VALIDATE = "oauth2/validate";

export default class TwitchAPI {

    oauthTokenURL = TWITCH_API_ROOT + TWITCH_API_OAUTH_TOKEN;
    oauthValidateURL = TWITCH_API_ROOT + TWITCH_API_OAUTH_VALIDATE;

    async requestOauthToken(clientId, clientSecret) {
        const queryParams = {
            "client_id": clientId,
            "client_secret": clientSecret,
            "grant_type": "client_credentials"
        };

        const queryParamsString = new URLSearchParams(queryParams).toString();
        const fullTokenUrl = this.oauthTokenURL + "?" + queryParamsString;

        const requestData = {
            method: "post",
            url: fullTokenUrl,
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        };

        console.log("Attempting request to acquire Twitch Access Token.")
        let result = await axios(requestData);

        if (!result.ok) {
            console.error("Unexpected token response: " + JSON.stringify(await result.json()));
            throw new Error("Unable to acquire new Twitch API token!");
        }

        const response = await result.json();
        console.log("Received Twitch Access token successfully.");
        return response;
    }

    async validateAccessToken(token) {
        const fullValidateUrl = this.oauthValidateURL;
        console.log("Validate URL: " + fullValidateUrl);
        const requestData = {
            method: "get",
            url: fullValidateUrl,
            headers: {
                "Authorization": `OAuth ${token}`
            }
        };

        let result = await axios(requestData);
        // 401 status means the token was invalid, which is a "valid" state for this call.
        // Anything otherwise is unexpected though.
        if (!(result.ok || result.status == 401)) {
            console.error(`Unexpected result (Status=${result.status}) from token validation: ${await result.text()}`);
            throw new Error("Unable to validate Twitch API token!");
        }

        const response = await result.json();
        console.log("Validate token response!");
        return response;
    }
}
