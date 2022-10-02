<template>
  <audio id="audio-player" controls class="rounded-b-lg">
    <source :src="props.src" type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
  <button @click="toggleAudio">Play / Pause</button>
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string;
}>();

const toggleAudio = () => {
  const audio = document.getElementById("audio-player");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
};
</script>
