# Game Data Multi-Library - Vue

This library uses the standard Vue template as a foundation. See the details below for running the project.

You will also need to create a `.env` file to store your API credentials. See the section below for more details.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Client Credentials

You will need to create a file for storing your client credentials. Typically these secrets would be handled through your server environment, but for basic testing you can create this environment file locally to immediately test the library.

Reminder: DON'T COMMIT SECRETS TO VERSION CONTROL!

### Twitch Account for Authentication

IGDB is owned and operated by Twitch.tv. In order to authenticate with the api, you will need an active Twitch account and register a developer application with it to acquire a Client ID and Client Secret. See IGDB's documentation here for details: [IGDB Account Creation](https://api-docs.igdb.com/#account-creation)

### Create Environment File

1. Create a `.env` file at the project root.
2. Add two fields called `CLIENT_ID` and `CLIENT_SECRET`.
3. Set those values to their respective values from your Twitch Developer App.
