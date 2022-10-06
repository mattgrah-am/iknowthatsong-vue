<template>
  <div>
    <p class="pb-4 text-center text-sm">{{ response }}. Play again?</p>
    <ArtistList />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useDeezerStore } from "../stores/deezerStore";
import ArtistList from "./ArtistList.vue";

const store = useDeezerStore();
const response = computed(() => {
  if (store.score === 10)
    return `Outstanding Effort! You scored ${store.score} out of ${store.gameTracks.length}`;
  else if (store.score > 5)
    return `Great work! You scored ${store.score} out of ${store.gameTracks.length}`;
  else if (store.score > 1)
    return `Not Bad... You scored ${store.score} out of ${store.gameTracks.length}`;
  else
    return `Unlucky... You should try again. You scored ${store.score} out of ${store.gameTracks.length}`;
});

store.artistList = [];
store.tracklist = {
  artist: undefined,
  tracks: [
    {
      title: undefined,
      cover: undefined,
      preview: undefined,
      songs: [],
    },
  ],
};
store.gameTracks = [];
store.trackNumber = 0;
store.score = 0;
</script>
