import apicalypse from "apicalypse";

export default class IGDB_Helper {
    rootUrl = "https://api.igdb.com";
    version = "v4";

    createRequest(clientId, apiToken) {
        const requestConfig = this.buildRequestConfig(clientId, apiToken);
        const apiRequest = apicalypse(requestConfig);
        return apiRequest;
    }

    buildRequestConfig(clientId, apiToken) {
        return {
            queryMethod: "body",
            method: "post",
            baseURL: this.getBaseUrl(),
            headers: this.buildHeadersForRequest(clientId, apiToken),
            responseType: "json",
        };
    }

    getBaseUrl() {
        const baseUrl = [this.rootUrl, this.version].join("/");
        return baseUrl;
    }

    buildHeadersForRequest(clientId, apiToken) {
        if (clientId === null || clientId === "") {
            throw new Error("Unable to build headers without a client ID!");
        }

        if (apiToken === null || apiToken === "") {
            throw new Error("Unable to build headers without an api token!");
        }

        const headers = {
            "Client-ID": clientId,
            "Authorization": `Bearer ${apiToken}`,
            "Accept": "application/json",
        }

        return headers;
    }
}
