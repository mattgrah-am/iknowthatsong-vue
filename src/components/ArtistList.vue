<template>
  <div>
    <div class="group relative z-0 mt-6 mb-8 w-full">
      <input
        name="artistInput"
        type="text"
        class="peer block w-full appearance-none rounded-lg border-2 border-neutral-400 bg-transparent py-2.5 px-2 text-sm text-neutral-900 shadow-inner focus:border-neutral-600 focus:outline-none focus:ring-0"
        placeholder=" "
        required
        v-model="artistInput"
        @input="handleChange"
      />
      <label
        for="artistInput"
        class="absolute top-3 -z-10 origin-[0] -translate-y-8 scale-75 transform px-4 text-sm text-neutral-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-8 peer-focus:-translate-x-2 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-neutral-900"
        >Search and select an Artist or Band
      </label>
      <div v-if="loading">
        <LoadingIcon />
      </div>
      <div v-if="!loading" v-for="artist in store.artistList">
        <div
          v-if="artist.name !== undefined"
          class="bg my-2 flex cursor-pointer items-center gap-4 rounded-lg border border-neutral-400 bg-neutral-100/70 hover:bg-neutral-400/50"
          @click="selectArtistBand(artist.tracklist, artist.name)"
          :key="artist.name"
        >
          <img
            :src="artist.picture"
            :alt="artist.name"
            class="w-12 rounded-l-lg border-r border-neutral-400"
          />
          <span class="font-bold">{{ artist.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDeezerStore } from "../stores/deezerStore";
import LoadingIcon from "./icons/LoadingIcon.vue";

const store = useDeezerStore();
const artistInput = ref("");
const loading = ref(false);

const handleChange = () => {
  if (artistInput.value.length >= 2 && artistInput.value.length <= 10) {
    loading.value = true;
    store.getArtistList(artistInput.value);
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
  if (artistInput.value.length < 2) {
    store.artistList = [];
  }
};

const selectArtistBand = (
  tracklist: string | undefined,
  name: string | undefined
) => {
  store.trackNumber = 0;
  store.getTrackList(tracklist, name);
};
</script>
