import { computed, ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

interface ArtistLists {
  name: string | undefined;
  picture: string | undefined;
  tracklist: string | undefined;
}

interface TrackList {
  artist: string | undefined;
  tracks: {
    title: string | undefined;
    cover: string | undefined;
    preview: string | undefined;
  }[];
}

export const useDeezerStore = defineStore("counter", () => {
  const api = `http://localhost:8787`;
  const artistList = ref<ArtistLists[]>([
    {
      name: undefined,
      picture: undefined,
      tracklist: undefined,
    },
  ]);
  const tracklist = ref<TrackList>({
    artist: undefined,
    tracks: [
      {
        title: undefined,
        cover: undefined,
        preview: undefined,
      },
    ],
  });

  const unplayableGame = computed(
    () =>
      tracklist.value.tracks.length > 1 && tracklist.value.tracks.length < 10
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

  const getTrackList = (
    tracks: string | undefined,
    artist: string | undefined
  ) => {
    axios
      .get(`${api}/tracklist/?q=${tracks}&n=${artist}`)
      .then((response) => {
        tracklist.value = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return { artistList, tracklist, unplayableGame, getArtistList, getTrackList };
});
