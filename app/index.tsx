import { StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { router } from 'expo-router';

const image = require('../assets/images/login_img.png');

const navigateLogin = () => {
    router.navigate({pathname: "./login"});
}

export default function LandingScreen() {
  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.buttonContainers}>
                    <TouchableOpacity style={[styles.logButtons, styles.loginButton]} onPress={navigateLogin}>
                        <Text style={styles.text}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.logButtons, styles.registerButton]} onPress={() => {window.alert('register')}}>
                        <Text style={styles.text}>Register</Text>
                    </TouchableOpacity>
                </View>
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
    justifyContent: 'flex-end',
  },
  text: {
    color: 'white',
    fontSize: 35,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainers: {
    gap: 20,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: 'transparent',
    marginBottom: 50,
  },
  logButtons: {
    borderRadius: 10,
    height: 80,
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#153363',
    elevation: 10,
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.5,
  },
  loginButton: {
    backgroundColor: '#4287f5',
  },
  registerButton: {
    backgroundColor: '#1e53a8',
  },
});
