import { StyleSheet, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { router } from 'expo-router';

const image = require('../assets/images/background_nologo.png');

const handleReset = () => {
    window.alert('Memophant!');
}

export default function LoginScreen() {
  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={'#fff'}
                inputMode={'email'}
                />
                <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                    <Text style={styles.buttonText}>Reset my password</Text>
                </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  input: {
    height: 60,
    width: '90%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'grey'
  },
  resetButton: {
    borderRadius: 10,
    height: 80,
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#153363',
    elevation: 10,
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.5,
    backgroundColor: '#606787',
  },
  buttonText: {
    color: 'white',
    fontSize: 35,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
