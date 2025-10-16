
export default class IGDB_API {
    rootUrl = "https://api.igdb.com";
    version = "v4";
    
    clientId = "";
    apiToken = "";
    
    constructor(clientId, apiToken) {
        this.clientId = clientId;
        this.apiToken = apiToken;
    }
    
    async request(endpoint, fields, filters) {
        const requestUrl = this.createRequestURLFor(endpoint);
        let apiRequest = this.buildRequest(requestUrl, fields, filters);
        
        // console.log("Making request to IGDB for data: " + apiRequest.body);
        let responseData = await fetch(apiRequest)
        .then(async (result) => {
            if (result.status !== 200) {
                console.log("IGDB API Result received: " + await result.text());
                throw new Error("Received bad result from IGDB API!");
            }
            
            return await result.json();
        })
        .then((response) => {
            console.log("Successfully retrieved data from IGDB API.");
            // console.log(`IGDB API Response: ${JSON.stringify(response)}`);
            return response;
        })
        
        return responseData;
    }
    
    createRequestURLFor(endpoint) {
        const endpointUrl = [this.rootUrl, this.version, endpoint].join("/");
        return endpointUrl;
    }
    
    buildRequest(url, fields = null, filters = null) {
        const requestBody = this.buildBodyForRequest(fields, filters);
        const requestHeaders = this.buildHeadersForRequest();
        
        const IGDBRequest = new Request(url, {
            method: "POST",
            headers: requestHeaders,
            body: requestBody
        });
        return IGDBRequest;
    }
    
    buildBodyForRequest(fields = null, filters = null) {
        let fieldsString = "fields *;";
        if (fields != null) {
            let fieldsList = this.getFieldsStringFromObject(fields);
            fieldsString = `fields ${fieldsList};`;
        }
        
        let filtersString = "";
        if (filters != null) {
            let filtersList = this.getFiltersStringFromObject(filters);
            filtersString = filtersList;
        }
        
        const bodyString = fieldsString + filtersString;
        console.log("Body for IGDB: ", bodyString);
        return bodyString;
    }
    
    buildHeadersForRequest() {
        if (this.clientId === null || this.clientId === "") {
            throw new Error("Unable to build headers without a client ID!");
        }
        
        if (this.apiToken === null || this.apiToken === "") {
            throw new Error("Unable to build headers without an api token!");
        }
        
        const headers = {
            "Client-ID": this.clientId,
            "Authorization": `Bearer ${this.apiToken}`
        }
        // console.log(`IGDB Headers: ${JSON.stringify(headers)}`);
        return headers;
    }
    
    // TODO: Ideally this would all be in a builder pattern for ease of maintenance and readability, but this gets the job done for now.
    
    // Sourced from: https://github.com/twitchtv/node-apicalypse/blob/master/src/builder.js
    getFieldsStringFromObject(fields) {
        let fieldsString = fields && fields.constructor === Array ? fields.join(",") : fields;
        fieldsString = fieldsString ? fieldsString.replace(/\s/g, "") : "";
        return fieldsString;
    }
    
    getFiltersStringFromObject(filters) {
        let filterString = "";
        
        for (const [key, value] of Object.entries(filters)) {
            filterString += `${key} ${value};`;
        }
        
        return filterString;
    }
}
