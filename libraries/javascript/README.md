# JavaScript Library for IGDB

A JavaScript library for interacting with IGDB - a database of video game data. This implementation utilizes the Apicalypse module provided by IGDB to assist with request building.

## Testing Setup

You can test the library out-of-the-box with some simple setup.

1. Install the latest stable versions of Node and NPM.
2. Clone/Download the project.
3. From the root directory of the library, run `npm install`.
4. Store client credentials (details below).
5. From the project directory, run `node app.js`.
6. Observe output data.

## Client Credentials

You will need to create a file for storing your client credentials. Typically these secrets would be handled through your server environment, but for basic testing you can create this secrets file to immediately test the library.

Reminder: DON'T COMMIT SECRETS TO VERSION CONTROL!

### Twitch Account for Authentication

IGDB is owned and operated by Twitch.tv. In order to authenticate with the api, you will need an active Twitch account and register a developer application with it to acquire a Client ID and Client Secret. See IGDB's documentation here for details: [IGDB Account Creation](https://api-docs.igdb.com/#account-creation)

### Create Secrets File

1. Create a `secrets.json` file at the project root.
2. Add two fields called `clientId` and `clientSecret`.
3. Set those values to their respective values from your Twitch Developer App.
