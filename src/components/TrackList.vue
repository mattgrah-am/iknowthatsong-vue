<template>
  <div v-if="store.tracklist.length">
    <div
      v-if="store.tracklist.length >= 5"
      v-for="track in store.tracklist"
      class="bg my-2 flex cursor-pointer flex-col rounded-lg border border-neutral-400 bg-neutral-100/70 text-sm hover:bg-neutral-400/50"
    >
      <div class="flex items-center gap-4">
        <img
          :src="track.cover"
          :alt="track.title"
          class="w-12 rounded-tl-lg border-r border-neutral-400"
        />
        <span class="font-bold">{{ track.title }}</span>
      </div>
      <AudioPlayer :src="track.preview" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDeezerStore } from "../stores/deezerStore";
import AudioPlayer from "./AudioPlayer.vue";

const store = useDeezerStore();
</script>
