<template>
  <div>
    <div>
      <AudioPlayer
        :preview="songs[track].preview"
        :cover="songs[track].cover"
        :index="track"
      />
      <div v-for="song in songs[track].songs">
        <button @click="nextSong">{{ song }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDeezerStore } from "../stores/deezerStore";
import AudioPlayer from "./AudioPlayer.vue";

const store = useDeezerStore();

let track = 0;
const songs = store.gameTracks;

const nextSong = () => {
  track++;
  console.log(track);
};
</script>
