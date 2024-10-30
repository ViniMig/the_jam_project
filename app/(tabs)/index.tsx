import { StyleSheet, SafeAreaView } from 'react-native';
import { View } from '../../components/Themed';
import Playlist from '../../components/Playlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabOneScreen() {
  return (
    <GestureHandlerRootView>
        <SafeAreaView style={styles.container}>
            <View
            style={styles.scrollHome}
            >
                <Playlist/>
            </View>
        </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingBottom: 20,
  },
  scrollHome: {
    width: '95%',
    margin: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "grey",
    height: 150,
    width: 200,
  },
});
