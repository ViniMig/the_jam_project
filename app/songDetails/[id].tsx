import { useLocalSearchParams } from 'expo-router';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import peopleList from '../../assets/data/test/people.json';

type Musician = {
    id: number,
    name: string,
    instruments: string[],
    songs: any[]
};

export default function DetailsScreen() {
    const { id, songTitle, songAuthor } = useLocalSearchParams();
    const [selectedMusicians, setSelectedMusicians] = useState<Musician[]>([]);
    
    // Get list of songs from available people list
    const initialList: Musician [] = [];
    
    peopleList.forEach(person => {
        if ((person.songs.find((song) => song.id === +id)) && (!(initialList.includes(person))))
            initialList.push(person);
    });

    const handleSelected = (musician: Musician) => {
        let musicianPresent = selectedMusicians.find((person) => person.id === musician.id);
        if (musicianPresent)
            setSelectedMusicians(selectedMusicians.filter((person) => person.id !== musician.id))
        else
            setSelectedMusicians([...selectedMusicians, musician])
    }

    return (
        <View style={styles.container}>
            <Text style={styles.songTitle}>{songTitle} - {songAuthor}</Text>
            <Text style={styles.subtitle}>Possible musicians:</Text>
            <FlatList
            contentContainerStyle={styles.musicianContainer}
            data={initialList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) =>{
                let times: number = Number(item.songs.find(song => song.id === +id).times_played);
                let isSelected: boolean = selectedMusicians.find((person) => person.id === item.id) !== undefined

                return (
                    <TouchableOpacity style={[styles.musician, isSelected ? styles.musicianSelected : styles.musicianUnselected]} onPress={() => handleSelected(item)}>
                        <View style={styles.musicianInfo}>
                            <Text style={styles.musicianName}>{item.name}</Text>
                            <Text style={styles.instruments}>{item.instruments}</Text>
                        </View>
                        <View style={styles.timesView}>
                            <Text style={times < 5 ? styles.timesCold : times < 20 ? styles.timesLukewarm : times < 1000 ? styles.timesWarm : styles.timesHot}>
                                Played{'\n'}{times} times
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 20,
  },
  songTitle: {
      fontSize: 20,
      marginBottom: 10,
      alignSelf: 'center',
      color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  musicianContainer: {
    gap: 5,
  },
  musician: {
    flex: 1,
    height: 80,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 5,
  },
  musicianSelected: {
    backgroundColor: "green",
  },
  musicianUnselected: {
    backgroundColor: "grey",
  },
  musicianInfo: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  timesView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: 30,
  },
  timesCold: {
    color: '#42c8f5',
  },
  timesLukewarm: {
    color: '#e3f542',
  },
  timesWarm: {
    color: '#f5b642',
  },
  timesHot: {
    color: '#f2411d',
  },
  musicianName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  instruments: {
    fontSize: 16,
    color: '#fff',
  },
});
