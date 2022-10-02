import axios from "axios";

export interface ArtistData {
  name: string;
  trackData: TrackData[];
  trackPreviewCount: number;
}

interface TrackData {
  options: string[];
  correct: {
    song: string;
    preview: string;
    image: string;
  };
}

interface Track {
  name: string;
  preview_url: string;
  album: { images: { url: string } };
}

export interface ArtistList {
  name: string;
  image: string;
}

interface Artist {
  name: string;
  images: { url: string };
}

const client_id = import.meta.env.SPOTIFY_API_ID;
const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET;
const auth_token = `${client_id}:${client_secret}`.toString();

const getAuth = async () => {
  try {
    const token_url = "https://accounts.spotify.com/api/token";
    const data = JSON.stringify({ grant_type: "client_credentials" });
    const response = await axios.post(token_url, data, {
      headers: {
        Authorization: `Basic ${auth_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.log(error);
  }
};

export const getArtistList = async (artist: string) => {
  const access_token = await getAuth();
  if (artist.length >= 3) {
    try {
      const artistIdUrl = `https://api.spotify.com/v1/search?q=${artist}&type=artist&market=US&limit=5`;
      const response = await axios.get(artistIdUrl, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return response.data.artists.items.map(({ name, images }: Artist) => {
        return {
          name,
          image: images[0]?.url,
        };
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const getArtistData = async (artist: string) => {
  const access_token = await getAuth();

  try {
    const artistIdUrl = `https://api.spotify.com/v1/search?q=${artist}&type=artist&market=US&limit=1`;
    const response = await axios.get(artistIdUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const artistId: string = response.data.artists.items[0].id;

    const artistDataUrl = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=AU`;
    const res = await axios.get(artistDataUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const trackData: TrackData[] = [];
    let trackPreviewCount: number = 0;
    let tracks = {};

    res.data.tracks.forEach((track: Track) => {
      if (track.preview_url) {
        trackData.push({
          options: [],
          correct: {
            song: track.name,
            preview: track.preview_url,
            image: track.album.images[0].url,
          },
        });
        trackPreviewCount++;
      }
      tracks[track.name] = track.name;
    });
    trackData.forEach((track) => {
      let songList = { ...tracks };
      let keys = Object.keys(songList);
      const songOptions: string[] = [];

      if (track.correct.preview) {
        delete songList[track.correct.song];
        keys.splice(keys.indexOf(track.correct.song), 1);

        songOptions.push(track.correct.song);
        for (let i = 3; i > 0; i--) {
          let randomOptionsSong = keys[Math.floor(Math.random() * keys.length)];
          songOptions.push(randomOptionsSong);
          delete songList[randomOptionsSong];
          keys.splice(keys.indexOf(randomOptionsSong), 1);
        }
        // shuffle tracks for question options
        songOptions.sort(() => (Math.random() > 0.5 ? 1 : -1));
        track.options.push(...songOptions);
      }
    });
    // shuffle Artist data to mix up each question
    trackData.sort(() => (Math.random() > 0.5 ? 1 : -1));
    return {
      trackPreviewCount: trackPreviewCount,
      trackData,
      name: artist,
    };
  } catch (error) {
    console.log(error);
  }
};
