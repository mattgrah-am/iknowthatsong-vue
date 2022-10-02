<template>
  <div v-if="store.tracklist.length">
    <div
      v-if="store.tracklist.length >= 5"
      v-for="(track, index) in store.tracklist"
    >
      <AudioPlayer
        :preview="track.preview"
        :cover="track.cover"
        :index="index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDeezerStore } from "../stores/deezerStore";
import AudioPlayer from "./AudioPlayer.vue";

const store = useDeezerStore();
</script>
