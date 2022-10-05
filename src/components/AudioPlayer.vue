<template>
  <audio :id="String(props.index)" controls class="hidden rounded-b-lg">
    <source :src="props.preview" type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
  <div>
    <h2
      class="mb-2 rounded-lg bg-neutral-900 py-2 text-center text-xl font-bold text-neutral-100"
    >
      {{ store.tracklist.artist }}
    </h2>
    <img
      :src="props.cover"
      alt="Album Art"
      class="w-full rounded-lg border border-neutral-300"
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
import { onMounted, ref } from "vue";
import { useDeezerStore } from "../stores/deezerStore";
import PlayIcon from "./icons/PlayIcon.vue";
import PauseIcon from "./icons/PauseIcon.vue";
import SpeakerIcon from "./icons/SpeakerIcon.vue";
import MuteIcon from "./icons/MuteIcon.vue";

const store = useDeezerStore();
const playStatus = ref(true);
const volumeStatus = ref(true);
const volume = ref(80);

const props = defineProps<{
  preview: string | undefined;
  cover: string | undefined;
  index: number | undefined;
}>();

onMounted(() => {
  toggleAudio();
});

setTimeout(() => {
  toggleAudio();
}, 30000);

const toggleAudio = () => {
  const audio = document.getElementById(
    String(props.index)
  ) as HTMLAudioElement;
  audio.paused ? audio.play() : audio.pause();
  audio.paused ? (playStatus.value = true) : (playStatus.value = false);
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
</script>
