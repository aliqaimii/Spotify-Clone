import React from "react";
import { ScrollView, View } from "react-native";
import AlbumItem from "./AlbumItem";

const RecommendationsList = ({ data, onSelectAlbum, style }) => {
  return (
    <ScrollView>
      <View style={style}>
        {data?.length > 0
          ? data.map((item, index) => {
              return (
                <AlbumItem onPress={onSelectAlbum} key={index} item={item} />
              );
            })
          : null}
      </View>
    </ScrollView>
  );
};

export default RecommendationsList;
