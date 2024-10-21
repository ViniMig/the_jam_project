import { StyleSheet, View, I18nManager } from 'react-native'
import { useState } from 'react'
import { Text } from './Themed';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { RectButton } from 'react-native-gesture-handler';
import CustomSwipeableRow from './CustomSwipeableRow';

import DraggableFlatList, { ScaleDecorator, }  from 'react-native-draggable-flatlist'

import peopleList from '../assets/data/test/people.json';
import musicList from '../assets/data/test/music.json';

//  To toggle LTR/RTL change to `true`
I18nManager.allowRTL(false);

type MusicItem = {
    id: number,
    name: string,
    author: string,
    instruments: string[]
};

// Get list of songs from available people list
const initialList: MusicItem [] = [];

peopleList.forEach(person => {
    person.songs.forEach(song => {
        musicList.filter(item => item.id === song.id).forEach(item => {
            if (!(initialList.includes(item)))
                initialList.push(item);
        });
    });
});

const Playlist = () => {
    const [musics, setMusics] = useState(initialList);

    // Handle swipe actions
    const handleDelete = (id: number) => {
        setMusics(musics.filter(song => song.id !== id));
    };

    const Row = ({ item, drag }: { item: MusicItem; drag: () => void }) => (
            <RectButton style={styles.rectButton} onLongPress={drag} onPress={() => router.push({pathname: "./songDetails/[id]", params: {id: item.id.toString(), songTitle: item.name}})}>
                <View style={styles.songItem}>
                    <Text style={styles.songTitle}>{item.name}</Text>
                    <Text style={styles.songAuthor}>{item.author}</Text>
                </View>
                <FontAwesome
                size={28}
                name="edit"
                />
            </RectButton>
    );
    
    const SwipeableRow = ({ item, drag, clickHandler }: {item: MusicItem, drag: () => void, clickHandler: any}) => {
        return (
            <ScaleDecorator>
                <CustomSwipeableRow onClick={clickHandler}>
                    <Row item={item} drag={drag}/>
                </CustomSwipeableRow>
            </ScaleDecorator>
        );
    };

    return (
        <DraggableFlatList
            data={musics}
            onDragEnd={({ data }) => setMusics(data)}
            renderItem={({ item, getIndex, drag }) => (
                getIndex() === 0 ?
                <View>
                    <Text style={styles.title}>Now Jamming:</Text>
                    <SwipeableRow
                    drag={drag}
                    item={item}
                    clickHandler={() => handleDelete(item.id)}
                    />
                    <View style={styles.separator} />
                    <Text style={styles.title}>Next in queue:</Text>
                </View>
                :
                <SwipeableRow
                drag={drag}
                item={item}
                clickHandler={() => handleDelete(item.id)}
                />
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
        />
  )
}

const styles = StyleSheet.create({
    listContainer: {
        gap: 10,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '100%',
        color: "#fff"
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingBottom: 10,
    },
    songTitle: {
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'bold',
    },
    songAuthor: {
        textAlign: 'left',
        fontSize: 12,
    },
    songItem: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    leftAction: {
        flex: 1,
        backgroundColor: '#497AFC',
        justifyContent: 'center',
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10,
    },
    rectButton: {
        flex: 1,
        height: 80,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: "grey",
      },
});

export default Playlist;