import React from "react";
import TrackItem from "./TrackItem";

const TrackList = ({ data, onTrackPress, albumImage, style }) => {
  const renderItem = ({ item }) => (
    <TrackItem
      index={item?.id}
      item={item}
      imageUri={albumImage}
      onPress={onTrackPress}
    />
  );

  return <FlatList style={style} data={data} renderItem={renderItem} />;
};

export default TrackList;
