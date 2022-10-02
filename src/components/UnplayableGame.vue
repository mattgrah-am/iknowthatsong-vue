<template>
  <div>
    <p class="pb-4 text-sm">
      Unfortunately <strong>{{ artist }} </strong> does not have enough playable
      tracks to play this game. Try again.
    </p>
    <ArtistList />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useDeezerStore } from "../stores/deezerStore";
import ArtistList from "./ArtistList.vue";

const store = useDeezerStore();
const artist = ref<string | null>("");

onMounted(() => {
  artist.value = store.tracklist[0].artist;
  store.artistList = [];
});
</script>
