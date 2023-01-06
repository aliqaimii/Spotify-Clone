import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

const AlbumItem = ({ onPress, index, item }) => {
  const source = { uri: item?.album?.images[0]?.url };
  return (
    <TouchableOpacity onPress={onPress} key={index} style={styles.albumCard}>
      <Image style={styles.albumImage} source={source} />
      <View style={styles.albumDetail}>
        <Text style={styles.albumTitle}>{item?.album?.name}</Text>
        <View style={styles.albumDetail2}>
          <Text style={styles.albumType}>
            {item?.album?.album_type?.toLowerCase()}
          </Text>
          <Text style={styles.albumSepText}> . </Text>
          {item?.album?.artists.map((item2, index) => {
            return (
              <Text key={index} style={styles.artistName}>
                {item?.album?.artists.length - 1 === index
                  ? item2?.name
                  : item2?.name + " , "}
              </Text>
            );
          })}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  albumCard: {
    margin: 5,
    width: "45%",
    marginBottom: 10,
  },
  albumImage: {
    width: "100%",
    height: 150,
  },
  albumDetail: { padding: 5 },
  albumTitle: {
    fontWeight: "400",
    color: "white",
    fontSize: 16,
  },
  albumDetail2: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  albumType: {
    fontWeight: "400",
    color: "gray",
    fontSize: 15,
  },
  albumSepText: {
    fontWeight: "900",
    color: "gray",
  },
  artistName: {
    fontWeight: "400",
    color: "gray",
    fontSize: 15,
  },
});

export default AlbumItem;
