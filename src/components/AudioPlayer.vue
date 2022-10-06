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
    <div>
      <button @click="muteAudio" class="pr-2">
        <SpeakerIcon v-if="volumeStatus" />
        <MuteIcon v-if="!volumeStatus" />
      </button>
      <input
        class="w-24"
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
import { onMounted, ref, watchEffect } from "vue";
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

const props = defineProps<{
  preview: string | undefined;
  cover: string | undefined;
  index: number | undefined;
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
  const audio = document.getElementById(
    String(props.index)
  ) as HTMLAudioElement;
  audio.muted = !volumeStatus.value;
};

watchEffect(() => {
  const preview = props.preview;
  player.value?.load();
  setTimeout(() => {
    toggleAudio();
  }, 1000);
});
</script>
