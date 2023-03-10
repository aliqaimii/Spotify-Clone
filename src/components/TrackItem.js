import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

const TrackItem = ({ imageUri, item, index, onPress }) => {
  const source = {
    uri: imageUri,
  };

  const onItemPress = () => onPress(item?.id);
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View key={index} style={styles.main}>
        <Image style={styles.img} source={source} />
        <View style={styles.detail}>
          <Text style={styles.trackTitle}>{item?.name}</Text>
          <View style={styles.artistView}>
            {item?.artists &&
              item?.artists.map((item2, index) => {
                let artistName =
                  item?.artists.length - 1 === index
                    ? item2?.name
                    : item2?.name + " , ";

                return (
                  <Text key={index} style={styles.artistName}>
                    {artistName}
                  </Text>
                );
              })}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    marginBottom: 5,
    padding: 10,
    flexDirection: "row",
  },
  img: {
    width: 70,
    height: 70,
  },
  detail: {
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: 20,
  },
  artistView: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
  },

  trackTitle: {
    fontWeight: "400",
    color: "white",
    fontSize: 18,
  },
  artistName: {
    fontWeight: "400",
    color: "gray",
    fontSize: 15,
  },
});

export default TrackItem;
