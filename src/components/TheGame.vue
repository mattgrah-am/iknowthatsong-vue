<template>
  <div class="w-full bg-neutral-100/90 p-8 shadow sm:w-96 sm:rounded-xl">
    <TheHeader />
    <UnplayableGame v-if="store.unplayableGame" />
    <ArtistList
      v-if="store.tracklist.tracks.length < 10 && !store.unplayableGame"
    />
    <TrackList
      v-if="store.tracklist.tracks.length > 1 && !store.unplayableGame"
    />
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { useDeezerStore } from "../stores/deezerStore";
import TheHeader from "./TheHeader.vue";
import TheFooter from "./TheFooter.vue";
import ArtistList from "./ArtistList.vue";
import TrackList from "./TrackList.vue";
import UnplayableGame from "./UnplayableGame.vue";

const store = useDeezerStore();
</script>
