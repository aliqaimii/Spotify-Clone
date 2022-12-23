import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {GetTrack} from '../services/Api';

const PlayItem = ({route, navigation}) => {
  const [trackData, setTrackData] = useState({});

  const {trackID, imageUri} = route.params;

  useEffect(() => {
    getTrack();
  }, []);

  const getTrack = async () => {
    const res = await GetTrack(trackID);
    if (res?.status === 200) {
      setTrackData(res?.data);
    }
  };

  function getDuration(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <View style={styles.main}>
      <Image
        style={styles.img}
        source={{
          uri: imageUri,
        }}
      />
      <View style={styles.main2}>
        <View style={styles.detailView1}>
          <Text style={styles.likeText}>{trackData?.popularity} Likes</Text>
          <Text style={styles.durationText}>
            {getDuration(trackData?.duration_ms)}
          </Text>
        </View>
        <View style={styles.detailView2}>
          <Text style={styles.trackName}>{trackData?.name}</Text>
          {trackData?.artists && (
            <View style={styles.albumDetail2}>
              <Text style={styles.albumType}>ARTISTS</Text>
              <Text style={styles.albumSepText}> . </Text>
              {trackData?.artists.map((item2, index) => {
                return (
                  <Text key={index} style={styles.artistName}>
                    {trackData?.artists.length - 1 === index
                      ? item2?.name
                      : item2?.name + ' , '}
                  </Text>
                );
              })}
            </View>
          )}
          <View style={styles.albumDetail2}>
            <Text style={styles.albumType}>ALBUM</Text>
            <Text style={styles.albumSepText}> . </Text>
            <Text style={styles.artistName}>{trackData?.album?.name}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#141414',
    flex: 1,
  },
  img: {
    width: '100%',
    height: '65%',
  },
  main2: {
    flex: 1,
  },
  detailView1: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
  },
  detailView2: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  durationText: {
    fontSize: 20,
    color: 'gray',
    fontWeight: '600',
  },
  likeText: {
    fontSize: 20,
    color: 'gray',
    fontWeight: '600',
  },
  albumDetail2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  albumType: {
    fontWeight: '400',
    color: 'gray',
    fontSize: 16,
  },
  albumSepText: {
    fontWeight: '900',
    color: 'gray',
    fontSize: 18,
  },
  artistName: {
    fontWeight: '400',
    color: 'gray',
    fontSize: 16,
  },
  trackName: {
    color: 'white',
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 15,
  },
});

export default PlayItem;
