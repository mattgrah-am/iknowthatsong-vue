<template>
  <div v-if="store.tracklist.length">
    <div
      v-if="store.tracklist.length >= 5"
      v-for="(track, index) in store.tracklist"
    >
      <h2
        class="mb-2 rounded-lg bg-neutral-900 py-2 text-center text-xl font-bold text-neutral-100"
      >
        {{ track.artist }}
      </h2>
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
