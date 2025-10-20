<script setup>
import DataPreview from './components/DataPreview.vue';
import { getCredentials, getAPIToken, getGenreData, getGameData, getCharacterData } from './api';

let sectionOne = ref({
  title: "Games",
  summary: "The top games of this generation!",
  data: null
});

let sectionTwo = ref({
  title: "Genres",
  summary: "Popular genres",
  data: null
});

let sectionThree = ref({
  title: "Characters",
  summary: "Do you recognize any?",
  data: null
});

const credentials = getCredentials();

const clientId = credentials.clientId;
const clientSecret = credentials.clientSecret;

const apiToken = getAPIToken(clientId, clientSecret);

sectionOne.data = getGenreData(clientId, apiToken);
sectionTwo.data = getGameData(clientId, apiToken);
sectionThree.data = getCharacterData(clientId, apiToken);


function refreshData() {
  
}

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header>

  <main>
    <div class="pageContent">
      <h1>Welcome to the VGD Multi Library!</h1>

      <div class="description">
        <p>You are viewing the Vue.js version of the Game Data Multi Library!</p>
        <p>See the GitHub repository for various language implentations of an IGDB library: <a
            href="https://github.com/LinkofOrigin/GameDataMultiLibrary/tree/release">IGDB Multi Library</a></p>
      </div>

      <span class="buttonContainer">
        <button id="refreshData">Reload Data</button>
      </span>

      <div id="sectionContainer" class="sectionContainer">
        <DataPreview title="Games" summary="" data="" />
        <DataPreview title="Genres" summary="" data="" />
        <DataPreview title="Characters" summary="" data="" />
      </div>
    </div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

body {
  margin: 0;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  background-color: #717171;
}

.pageContent {
  max-width: 1080px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #d3d3d3;
}

.pageContent h1 {
  display: flex;
  justify-content: center;
}

.pageContent .description {
  display: flex;
  flex-direction: column;
  align-items: left;
  margin: 0 10%;
}

.pageContent p {
  flex: 1 1 auto;
  text-align: justify;
}

.pageContent .buttonContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem auto;
}

.buttonContainer button {
  font-size: 18px;
}

.sectionContainer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}
</style>
