# JavaScript Library for IGDB

A JavaScript library for interacting with IGDB - a database of video game data. This implementation utilizes the Apicalypse module provided by IGDB to assist with request building.

## Usage

First you will need to acquire credentials from the Twitch API in order to call IGDB. Once you have a valid API token, you can call IGDB for data.

1. Instantiate an instance of IGDB_Helper.
2. Call `createRequest(CLIENT_ID, API_TOKEN)` with your appropriate credentials for accessing the API
3. Chain any desired filters and options for that request.
4. Call `.request(URL)` with your desired API endpoint.
5. Handle the Promise as you see fit and observe the results.

### Examples

Get an API token from Twitch and prepare to build an IGDB request.

```JavaScript
// Get an OAuth Access token from Twitch
const twitchApi = new TwitchApi();
const apiToken = twitchApi.requestOauthToken(CLIENT_ID, CLIENT_SECRET); // Store these in your environment!

// Instantiate our helper and create a builder request
const igdb = new IGDB_Helper();
const igdbRequest = igdb.createRequest(CLIENT_ID, apiToken);
```

Get 5 genres and sort them by when they were last updated.

```JavaScript
igdbRequest
    .fields("name", "updated_at")
    .limit(5);

const responseData = igdbRequest.request("/genres")
    .then(
        /* Handle promise here as desired */
    );
```
