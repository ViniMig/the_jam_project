import { StyleSheet, FlatList, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import ScrollableList from '../../components/ScrollableList';

const jamListTest = ["jams das quintas", "jam sensations", "irokumata", "aiaiai o cu do teu pai"];

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollHome}>
            <ScrollableList
            title='My Jams'/>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <ScrollableList
            title='Nearby Jams'/>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollHome: {
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
