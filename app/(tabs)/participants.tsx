import { StyleSheet, FlatList, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import ScrollableList from '../../components/ScrollableList';
import { FontAwesome } from '@expo/vector-icons';

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
            <ScrollableList
            title='Available:'/>
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.buttonText}>Add Participant</Text>
                <FontAwesome
                    name="qrcode"
                    size={30}
                    color={'#fff'}
                />
            </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 80,
    width: '80%',
    backgroundColor: '#4f79e3',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
