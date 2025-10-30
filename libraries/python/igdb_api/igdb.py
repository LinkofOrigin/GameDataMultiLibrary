# Note that IGDB provides their own Python implementation of this library,
# so my implementation is largely based on theirs: https://github.com/twitchtv/igdb-api-python/blob/master/src/igdb/wrapper.py

from requests import post

API_ROOT = "https://api.igdb.com"
API_VERSION = "v4"

class IGDB:
    def __init__(self, client_id: str, api_token: str):
        self.client_id = client_id
        self.api_token = api_token
    
    
    def make_request(self, endpoint: str, query: str) -> bytes:
        print("Attempting to make request to IGDB")
        endpoint_url = IGDB.build_endpoint_url(endpoint)
        request_params = self.build_request_params(query)
        
        print(f"url={endpoint_url} | params={request_params}")
        response = post(endpoint_url, **request_params)
        response.raise_for_status()
        
        print("Successfully retrieved response from IGDB!")
        
        return response.json()
    
    
    def build_request_params(self, query: str) -> dict:
        request = {}
        request['headers'] = self.build_headers_for_request()
        request['data'] = query
        return request
    
    
    @staticmethod
    def build_endpoint_url(endpoint: str) -> str:
        base_url = IGDB.get_base_url()
        endpoint_url = "/".join([base_url, endpoint])
        return endpoint_url
    
    
    @staticmethod
    def get_base_url() -> str:
        base_url = "/".join([API_ROOT, API_VERSION])
        return base_url
    
    
    def build_headers_for_request(self) -> dict:
        headers = {
            "Client-ID": self.client_id,
            "Authorization": f"Bearer {self.api_token}",
            "Accept": "application/json",
        }
        return headers
