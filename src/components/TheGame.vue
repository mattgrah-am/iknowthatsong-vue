<template>
  <div class="w-full bg-neutral-100/90 p-8 shadow sm:w-96 sm:rounded-xl">
    <TheHeader />
    <UnplayableGame v-if="store.playableGame === false" />
    <ArtistList
      v-if="store.playableGame === true && store.tracklist.tracks.length < 10"
    />
    <TrackList
      v-if="store.playableGame === true && store.tracklist.tracks.length > 1"
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
