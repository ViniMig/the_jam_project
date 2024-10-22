import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text } from '../../components/Themed';

import peopleList from '../../assets/data/test/people.json';

export default function DetailsScreen() {
    const { id, songTitle, songAuthor } = useLocalSearchParams();

    type Musician = {
        id: number,
        name: string,
        instruments: string[],
        songs: any[]
    };
    
    // Get list of songs from available people list
    const initialList: Musician [] = [];
    
    peopleList.forEach(person => {
        if ((person.songs.find((song) => song.id === +id)) && (!(initialList.includes(person))))
            initialList.push(person);
    });

    return (
        <View style={styles.container}>
            <Text style={styles.songTitle}>{songTitle} - {songAuthor}</Text>
            <Text style={styles.subtitle}>Possible musicians:</Text>
            <FlatList
            style={styles.musicianContainer}
            data={initialList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) =>(
                <TouchableOpacity style={styles.musician} onPress={() => window.alert('select this dude')}>
                    <Text>{item.name}</Text>
                    <Text>{item.instruments}</Text>
                </TouchableOpacity>
            )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 20,
    borderWidth: 1,
    borderColor: 'blue',
  },
  songTitle: {
      fontSize: 20,
      marginBottom: 10,
      alignSelf: 'center',
      borderWidth: 1,
      borderColor: 'green'
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'orange'
  },
  musicianContainer: {
    gap: 20,
    //width: '95%',
    borderWidth: 1,
    borderColor: 'white'
  },
  musician: {
    flex: 1,
    height: 70,
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 20,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: "grey",
    borderWidth: 1,
    borderColor: 'red'
  },
});
