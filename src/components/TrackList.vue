<template>
  <div>
    <div v-for="(track, index) in store.tracklist.tracks">
      <h2
        class="mb-2 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-700 py-2 text-center text-xl font-bold text-neutral-100"
      >
        {{ store.tracklist.artist }}
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
