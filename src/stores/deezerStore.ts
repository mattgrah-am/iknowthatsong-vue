import { computed, ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

interface ArtistLists {
  name: string;
  picture: string;
  tracklist: string;
}

interface TrackList {
  artist: string | null;
  title: string;
  cover: string;
  preview: string;
}

export const useDeezerStore = defineStore("counter", () => {
  const api = `http://localhost:8787`;
  const artistList = ref<ArtistLists[] | []>([]);
  const tracklist = ref<TrackList[] | []>([]);

  const unplayableGame = computed(
    () => tracklist.value.length > 0 && tracklist.value.length < 5
  );

  const getArtistList = (artist: string) => {
    axios
      .get(`${api}/search/?q=${artist}`)
      .then((response) => {
        artistList.value = response.data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getTrackList = (tracks: string, artist: string) => {
    axios
      .get(`${api}/tracklist/?q=${tracks}&n=${artist}`)
      .then((response) => {
        tracklist.value = response.data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return { artistList, tracklist, unplayableGame, getArtistList, getTrackList };
});
