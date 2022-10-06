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
  tracks: Tracks[];
}
interface Tracks {
  title: undefined;
  cover: undefined;
  preview: undefined;
  songs: string[];
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
        songs: [],
      },
    ],
  });
  const playableGame = ref(true);
  const gameTracks = ref<Tracks[] | []>([
    {
      title: undefined,
      cover: undefined,
      preview: undefined,
      songs: [],
    },
  ]);

  const trackNumber = ref(0);
  const score = ref(0);

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
        playableGame.value = response.data.playable;
        const gameSongs: Tracks[] = [];
        const songs: string[] = [];
        let trackCounter = 10;
        while (trackCounter > 0) {
          gameSongs.push(
            ...tracklist.value.tracks.splice(
              Math.floor(Math.random() * tracklist.value.tracks.length),
              1
            )
          );
          trackCounter--;
        }
        gameSongs.forEach((track: Tracks) => songs.push(track.title!));
        trackCounter = 10;
        let songList = [...new Set(songs)];
        while (trackCounter > 0) {
          gameSongs.forEach((track: Tracks) => {
            track["songs"] = [];
            if (songList.includes(track.title!)) {
              track.songs.push(track.title!);
              songList.splice(songList.indexOf(track.title!), 1);
              while (track.songs.length < 4) {
                track.songs.push(
                  songList.splice(
                    Math.floor(Math.random() * songList.length),
                    1
                  )[0]
                );
              }
              track.songs.sort(() => (Math.random() > 0.5 ? 1 : -1));
              songList = [...new Set(songs)];
            }
          });
          trackCounter--;
        }
        gameTracks.value = gameSongs;
      })
      .catch((error) => {});
  };

  return {
    artistList,
    tracklist,
    gameTracks,
    trackNumber,
    score,
    playableGame,
    getArtistList,
    getTrackList,
  };
});
