import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { GetAccessToken, GetRecommendations } from "../services/Api";
import RecommendationsList from "../components/RecommendationsList";

const Recommendations = ({ navigation }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await GetAccessToken();

    if (res?.status === 200) {
      let token = res?.data?.access_token;
      const jsonValue = JSON.stringify(token);
      AsyncStorage.setItem("AccessToken", jsonValue);
      getRecommendations();
    }
  };

  const getRecommendations = async () => {
    const res = await GetRecommendations();
    if (res?.status === 200) {
      setRecommendations(res?.data?.tracks);
    }
  };

  const onSelectAlbum = (item) => {
    let data = item?.album;
    let img = item?.album?.images[0]?.url;
    navigation.navigate("Playlist", { data, imageUri: img });
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Recommended for you</Text>
      <Text style={styles.tracks}>{recommendations?.length} - Playlists</Text>

      <RecommendationsList
        data={recommendations}
        onSelectAlbum={onSelectAlbum}
        style={styles.main2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#141414",
    padding: 10,
  },
  main2: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 10,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "white",
  },
  tracks: {
    fontSize: 22,
    fontWeight: "600",
    color: "gray",
  },
});

export default Recommendations;
