<template>
  <div>
    <p class="pb-4 text-center text-sm">
      {{ response }}. Do you want to play again?
    </p>
    <ArtistList />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useDeezerStore } from "../stores/deezerStore";
import ArtistList from "./ArtistList.vue";

const store = useDeezerStore();
const score = store.score;
const response = computed(() => {
  if (score >= 8) return `Outstanding Effort! You scored ${score} out of 10`;
  else if (score >= 5) return `Great work! You scored ${score} out of 10`;
  else if (score > 1) return `Not Bad... You scored ${score} out of 10`;
  else return `Unlucky... You should try again. You scored ${score} out of 10`;
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
store.score = 0;
</script>
