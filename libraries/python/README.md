# Python Library for IGDB

A Python library for interacting with IGDB - a database of video game data. This library assists with authentication via Twitch and making requests to IGDB.

## Usage

First you will need to acquire credentials from the Twitch API in order to call IGDB. Once you have a valid API token, you can call IGDB for data.

### Examples

Get an API token from Twitch and prepare to build an IGDB request.
print("Getting secrets from file/env")

```python
# Setup your imports as needed
from igdb_api import igdb
from twitch import twitch_oauth
import json

#...

def test_igdb():
    # Retrieve your secrets from a secure environment!
    client_id = 'CLIENT_ID'
    client_secret = 'CLIENT_SECRET'

    # Utilize Twitch's OAuth API to acquire an access token
    twitch = twitch_oauth.TwitchOauth()
    token_response = twitch.request_oauth_token(client_id, client_secret)
    oauth_token = token_response["access_token"]

    # Prepare to make a request to IGDB using your client ID and newly-acquired access token
    api = igdb.IGDB(client_id, oauth_token)
    
    # Get the name and release date of a single game returned from the API
    endpoint = "games"
    query = "fields name, release_dates; limit 1;"

    # Make the API request -> returns a JSON object
    api_response = api.make_request(endpoint, query)
    print(api_response)
```
