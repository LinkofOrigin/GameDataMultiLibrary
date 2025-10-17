// Slugs
const PRIMARY_DATA = "primaryData";
const SECONDARY_DATA = "secondaryData";
const TERTIARY_DATA = "tertiaryData";


function injectDataToPage(sectionSlug, data) {
    // Locate the housing element for this data
    const dataContainerSlug = sectionSlug + "Container";
    let dataContainerElement = document.getElementById(dataContainerSlug);
    
    const dataTitle = data.title.slice(0, 1).toUpperCase() + data.title.slice(1).toLowerCase();
    dataContainerElement.querySelector("[name='title']").innerHTML = dataTitle;
    
    const dataSummary = data.summary;
    dataContainerElement.querySelector("[name='summary']").innerHTML = dataSummary;
    
    const rawData = JSON.stringify(data.data, null, 6);
    dataContainerElement.querySelector("[name='data']").innerText = rawData;
}

/**
 * Convert the API data format to a consistent structure for the client to process.
 * 
 * @param {JSON} apiData 
 * @returns 
 */
function parseData(apiData) {
    const primaryData = apiData.primary;
    const secondaryData = apiData.secondary;
    const tertiaryData = apiData.tertiary;
    
    return {
        primary: primaryData,
        secondary: secondaryData,
        tertiary: tertiaryData
    }
}


export default async function getGameData() {
    let gameDataResponse = await fetch("/get_idgb_data");
    if (!gameDataResponse.ok) {
        console.error("Failed game data response: " + JSON.stringify(await gameDataResponse.json()));
        throw new Error("Failed to retrieve game data!");
    }
    
    const gameData = await gameDataResponse.json();
    console.log(`Client received game data: ${JSON.stringify(gameData)}`);
    
    const parsedData = parseData(gameData);
    
    injectDataToPage(PRIMARY_DATA, parsedData.primary);
    injectDataToPage(SECONDARY_DATA, parsedData.secondary);
    injectDataToPage(TERTIARY_DATA, parsedData.tertiary);
    
    return gameData;
}
