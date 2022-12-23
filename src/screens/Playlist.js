import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import TrackItem from '../components/TrackItem';
import {GetAlbumTracks} from '../services/Api';

const Playlist = ({route, navigation}) => {
  const [albumData, setAlbumData] = useState({});

  const {data, imageUri} = route.params;

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

  const onTrackPress = id => {
    navigation.navigate('PlayItem', {trackID: id, imageUri: imageUri});
  };

  const renderItem = ({item}) => (
    <TrackItem
      index={item?.id}
      item={item}
      imageUri={imageUri}
      onPress={() => onTrackPress(item?.id)}
    />
  );

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>
        <Image
          style={styles.img}
          source={{
            uri: imageUri,
          }}
        />
        <Text style={styles.albumName}>{data?.name}</Text>
        <View style={styles.artistView}>
          <Text style={styles.artistText}>ARTIST - </Text>
          <Text style={styles.artistName}>
            {data?.artists[0]?.name ? data?.artists[0]?.name : ''}
          </Text>
        </View>
      </View>
      <FlatList
        style={styles.list}
        data={albumData?.items}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#141414',
    padding: 10,
  },
  header: {
    marginTop: 20,
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  backBtn: {
    color: 'white',
    marginRight: 10,
    position: 'absolute',
    fontSize: 15,
    left: 5,
  },
  backBtnText: {
    color: 'white',
    fontSize: 15,
  },
  img: {
    width: 250,
    height: 230,
  },
  list: {
    paddingTop: 10,
  },
  albumName: {
    color: 'white',
    fontSize: 25,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: '600',
    paddingHorizontal: 20,
  },
  artistView: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  artistText: {
    color: 'gray',
    fontSize: 18,
  },
  artistName: {
    color: 'gray',
    fontSize: 18,
  },
});

export default Playlist;
