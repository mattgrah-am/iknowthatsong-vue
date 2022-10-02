<template>
  <div>
    <div class="flex items-center justify-center text-xs">
      Created with 🖤 by&nbsp;
      <a
        href="https://www.mattgrah.am"
        target="_blank"
        rel="noreferrer"
        class="text-neutral-500 hover:underline hover:underline-offset-2"
      >
        mattgrah.am
      </a>
      &nbsp;using&nbsp;
      <a href="https://developers.deezer.com/" target="_blank" rel="noreferrer">
        <img class="w-14" src="src/assets/img/deezer.png" alt="Deezer" />
      </a>
      <sup>&nbsp;API</sup>
    </div>
    <button
      id="show-modal"
      @click="showModal = true"
      class="w-full text-xs text-neutral-500 hover:underline hover:underline-offset-2"
    >
      Learn more about this web app.
    </button>

    <Teleport to="body">
      <AboutModal :show="showModal" @close="showModal = false" />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AboutModal from "./AboutModal.vue";

const showModal = ref(false);
</script>
