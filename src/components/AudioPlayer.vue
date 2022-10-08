<template>
  <audio
    ref="player"
    :id="String(props.index)"
    controls
    class="hidden rounded-b-lg"
  >
    <source :src="props.preview" type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
  <div class="flex flex-col items-center">
    <h2
      class="mb-2 flex w-full justify-between rounded-lg bg-neutral-900 px-8 py-1 text-center text-xl font-bold text-neutral-100 sm:py-2"
    >
      {{ store.tracklist.artist }}
      <span class="text pl-4 text-sm font-normal"
        >score:
        <span class="pl-1 text-lg font-bold">{{ store.score }}</span></span
      >
    </h2>
    <img
      :src="props.cover"
      alt="Album Art"
      class="w-3/4 rounded-lg border border-neutral-300 sm:w-full"
    />
  </div>

  <div class="flex items-center justify-between px-2 py-4">
    <button @click="toggleAudio">
      <PlayIcon v-if="playStatus" />
      <PauseIcon v-if="!playStatus" />
    </button>
    <div class="flex items-center">
      <button @click="muteAudio" class="pr-2">
        <SpeakerIcon v-if="volumeStatus" />
        <MuteIcon v-if="!volumeStatus" />
      </button>
      <input
        class="m-2 h-1 w-24 appearance-none rounded-full bg-neutral-900"
        type="range"
        min="1"
        max="100"
        v-model="volume"
        @change="volumeAdjust"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from "vue";
import { useDeezerStore } from "../stores/deezerStore";
import PlayIcon from "./icons/PlayIcon.vue";
import PauseIcon from "./icons/PauseIcon.vue";
import SpeakerIcon from "./icons/SpeakerIcon.vue";
import MuteIcon from "./icons/MuteIcon.vue";

const store = useDeezerStore();
const playStatus = ref(true);
const volumeStatus = ref(true);
const volume = ref(80);
const player = ref<HTMLAudioElement | null>(null);
let currentVolume = 0;

const props = defineProps<{
  preview: string | undefined;
  cover: string | undefined;
  index: number | undefined;
  clicked: boolean;
}>();

const toggleAudio = () => {
  player.value?.paused ? player.value?.play() : player.value?.pause();
  player.value?.paused ? (playStatus.value = true) : (playStatus.value = false);
};

const volumeAdjust = () => {
  const audio = document.getElementById(
    String(props.index)
  ) as HTMLAudioElement;
  audio.volume = volume.value / 100;
};

const muteAudio = () => {
  volumeStatus.value = !volumeStatus.value;
  if (volume.value > 0) {
    currentVolume = volume.value;
  }
  const audio = document.getElementById(
    String(props.index)
  ) as HTMLAudioElement;
  audio.muted = !volumeStatus.value;
  !volumeStatus.value ? (volume.value = 0) : (volume.value = currentVolume);
  console.log(currentVolume);
};
watchEffect(() => {
  if (props.clicked) toggleAudio();
});

watchEffect(() => {
  const preview = props.preview;
  player.value?.load();
  toggleAudio();
});
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb,
input[type="range"]::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background-color: rgb(245 245 244);
  border: rgb(115 115 115) 1px solid;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
</style>
