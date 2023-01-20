import React, { useEffect, useState } from "react";

import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

import TrackList from "../components/TrackList";
import { GetAlbumTracks } from "../services/Api";

const Playlist = ({ route, navigation }) => {
  const [albumData, setAlbumData] = useState({});

  const { data, imageUri } = route.params;

  const source = {
    uri: imageUri,
  };

  useEffect(() => {
    getAlbum();
  }, []);

  const getAlbum = async () => {
    const res = await GetAlbumTracks(data?.id);
    if (res?.status === 200) {
      setAlbumData(res?.data);
    }
  };
  const onBackPress = () => {
    navigation.goBack();
  };
  const onTrackPress = (id) => {
    navigation.navigate("PlayItem", { trackID: id, imageUri: imageUri });
  };

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>
        <Image style={styles.img} source={source} />
        <Text style={styles.albumName}>{data?.name}</Text>
        <View style={styles.artistView}>
          <Text style={styles.artistText}>ARTIST - </Text>
          <Text style={styles.artistName}>
            {data?.artists[0]?.name ? data?.artists[0]?.name : ""}
          </Text>
        </View>
      </View>

      <TrackList
        albumImage={imageUri}
        data={albumData?.items}
        style={styles.list}
        onTrackPress={onTrackPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#141414",
    padding: 10,
  },
  header: {
    marginTop: 20,
    alignItems: "center",
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  backBtn: {
    color: "white",
    marginRight: 10,
    position: "absolute",
    fontSize: 15,
    left: 5,
  },
  backBtnText: {
    color: "white",
    fontSize: 15,
  },
  img: {
    width: 250,
    height: 230,
  },
  albumName: {
    color: "white",
    fontSize: 25,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "600",
    paddingHorizontal: 20,
  },
  artistView: {
    flexDirection: "row",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  artistText: {
    color: "gray",
    fontSize: 18,
  },
  artistName: {
    color: "gray",
    fontSize: 18,
  },
});

export default Playlist;
