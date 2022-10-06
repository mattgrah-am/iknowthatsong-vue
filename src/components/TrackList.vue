<template>
  <AudioPlayer
    :preview="songs[store.trackNumber].preview"
    :cover="songs[store.trackNumber].cover"
    :index="store.trackNumber"
  />
  <div v-for="song in songs[store.trackNumber].songs">
    <button
      @click="nextSong(song)"
      class="mb-2 w-full rounded border border-neutral-500 bg-neutral-100 px-2 py-1 text-neutral-700 hover:bg-neutral-400/50 hover:text-neutral-700 disabled:bg-transparent disabled:text-neutral-100"
      :class="
        clicked === true && song === store.gameTracks[store.trackNumber].title
          ? '!border-emerald-900 !bg-emerald-500'
          : clicked && song === song
          ? '!border-rose-900 !bg-rose-500'
          : ''
      "
      :disabled="clicked"
    >
      {{ song }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDeezerStore } from "../stores/deezerStore";
import AudioPlayer from "./AudioPlayer.vue";

const store = useDeezerStore();
const songs = store.gameTracks;
const correctSong = ref<string | undefined>("");
const clicked = ref(false);

const nextSong = (song: string) => {
  correctSong.value = store.gameTracks[store.trackNumber].title;
  let selectedSong = song;
  clicked.value = true;
  correctSong.value === selectedSong ? store.score++ : store.score--;
  let nextSong = setTimeout(() => {
    store.trackNumber++;
    clicked.value = false;
  }, 3000);
};
</script>
