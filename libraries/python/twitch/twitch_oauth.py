
from requests import post, get

TWITCH_API_ROOT = "https://id.twitch.tv/"
TWITCH_API_OAUTH_TOKEN = "oauth2/token"
TWITCH_API_OAUTH_VALIDATE = "oauth2/validate"

class TwitchOauth:
    
    def request_oauth_token(self, client_id: str, client_secret: str) -> dict:
        print("Attempting to retrieve a new access token")
        params = {
            "client_id": client_id,
            "client_secret": client_secret,
            "grant_type": "client_credentials",
        }
        
        headers = {
            "Content-Type": "application/json; charset=UTF-8",
        }
        
        request_params = {
            "headers": headers,
            "params": params,
        }
        
        token_url = TwitchOauth.build_token_url()
        response = post(token_url, **request_params)
        response.raise_for_status()
        
        print("Successfully retrieved new access token!")
        response_data = response.json()
        return response_data
    
    
    def validate_access_token(self, token) -> dict:
        print("Attempting to validate access token")
        headers = {
            "Authorization": f"Oauth {token}",
        }
        
        request_params = {
            "headers": headers,
        }
        
        token_url = TwitchOauth.build_token_url()
        response = get(token_url, **request_params)
        response.raise_for_status()
        
        print("Validated access token")
        response_data = response.json()
        return response_data
    
    
    @staticmethod
    def build_token_url() -> str:
        oauth_token_url = "".join([TWITCH_API_ROOT, TWITCH_API_OAUTH_TOKEN])
        return oauth_token_url
    
    
    @staticmethod
    def build_validate_url() -> str:
        validate_url = "".join([TWITCH_API_ROOT, TWITCH_API_OAUTH_VALIDATE])
        return validate_url
