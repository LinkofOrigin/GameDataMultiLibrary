
export default async function getGameData() {
    let gameDataResponse = await fetch("/get_idgb_data");
    if (!gameDataResponse.ok) {
        console.error("Failed game data response: " + JSON.stringify(await gameDataResponse.json()));
        throw new Error("Failed to retrieve game data!");
    }
    
    let gameData = await gameDataResponse.text();
    console.log(`Client received game data: ${gameData}`);
    
    return gameData;
}