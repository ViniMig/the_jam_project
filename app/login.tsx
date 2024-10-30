import { StyleSheet, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import { Text } from '../components/Themed';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import React from 'react';

const image = require('../assets/images/background_nologo.png');
const [username, setUsername] = React.useState('');
const [password, setPassword] = React.useState('');

const handleLogin = () => {
    router.navigate({pathname: "./(tabs)"});
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
                <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={'#fff'}
                secureTextEntry={true}
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Link href={'/recover'} style={styles.resetLink}>Forgot password</Link>
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
  loginButton: {
    borderRadius: 10,
    height: 80,
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#153363',
    elevation: 10,
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.5,
    backgroundColor: '#4287f5',
  },
  buttonText: {
    color: 'white',
    fontSize: 35,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resetLink: {
    color: 'white',
    textDecorationLine: 'underline',
  },
});
