const TWITCH_API_ROOT = "https://id.twitch.tv/";
const TWITCH_API_OAUTH_TOKEN = "oauth2/token";

export default class TwitchAPI {
    
    oauth_token_url = TWITCH_API_ROOT + TWITCH_API_OAUTH_TOKEN;
    
    redirect_to_oauth() {
        window.location = this.oauth_token_url;
    }
    
    
    receive_oauth_token(token) {
        
    }
    
}

