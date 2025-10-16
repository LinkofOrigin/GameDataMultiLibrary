const TWITCH_API_ROOT = "https://id.twitch.tv/";
const TWITCH_API_OAUTH_TOKEN = "oauth2/token";

export default class TwitchAPI {
    
    oauthTokenURL = TWITCH_API_ROOT + TWITCH_API_OAUTH_TOKEN;
    
    async request_oauth_token(client_id, client_secret) {
        const queryParams = {
            "client_id": client_id,
            "client_secret": client_secret,
            "grant_type": "client_credentials"
        };
        
        const queryParamsString = new URLSearchParams(queryParams).toString();
        
        console.log("post data = " + queryParamsString);
        
        const requestData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        };
        
        const fullTokenUrl = this.oauthTokenURL + "?" + queryParamsString
        
        const token_response = await fetch(fullTokenUrl, requestData);
        if (!token_response.ok) {
            console.error("Something bad token");
            console.log("Received token bad: " + JSON.stringify(await token_response.json()))
            return null;
        }
        
        const response_result = await token_response.json();
        console.log("Received token successfully: " + response_result)
        return response_result;
    }
    
    refresh_oauth_token() {
        
    }
    
    receive_oauth_token(token) {
        
    }
    
}

