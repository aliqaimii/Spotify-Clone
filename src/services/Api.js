import AsyncStorage from "@react-native-async-storage/async-storage";
import { Get, Put, PostToken } from "./https";

const GET_TOKEN_URL = "https://accounts.spotify.com/api/token";
const CLIENT_ID = "2ce3c99f01334d1280125274b6e32547";
const CLIENT_SECRET = "c2d78d34788a4db7a3acf27c3101afed";
const URL = "https://api.spotify.com/v1";

export const GetAccessToken = () => {
  let url = GET_TOKEN_URL;
  return PostToken(url, CLIENT_ID, CLIENT_SECRET);
};

export const GetRecommendations = async () => {
  let url = `${URL}/recommendations`;
  const token = await AsyncStorage.getItem("AccessToken");
  let parseToken = JSON.parse(token);
  let params = {
    seed_artists: "6sFIWsNpZYqfjUpaCgueju",
  };
  return Get(parseToken, url, params);
};

export const GetAlbumTracks = async (id) => {
  let url = `${URL}/albums/${id}/tracks`;
  const token = await AsyncStorage.getItem("AccessToken");
  let parseToken = JSON.parse(token);

  return Get(parseToken, url);
};

export const GetTrack = async (id) => {
  let url = `${URL}/tracks/${id}`;
  const token = await AsyncStorage.getItem("AccessToken");
  let parseToken = JSON.parse(token);

  return Get(parseToken, url);
};

export const PlayTrack = async (albumUri, uri, deviceId) => {
  let data = {
    context_uri: albumUri,
    uris: [uri],
    offset: {
      position: 5,
    },
    position_ms: 0,
  };
  let url = `${URL}/me/player/play`;
  let params = {
    device_id: deviceId,
  };
  const token = await AsyncStorage.getItem("AccessToken");
  let parseToken = JSON.parse(token);

  return Put(parseToken, url, data, params);
};
