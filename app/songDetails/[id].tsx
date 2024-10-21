import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../components/Themed';

export default function DetailsScreen() {
  const { id, songTitle } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text>Name: {songTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
