import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import * as React from 'react';
import * as SecureStore from 'expo-secure-store';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// export const unstable_settings = {
//   initialRouteName: 'login',
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const AuthContext = React.createContext<{ signIn: any; signOut: any;  signUp: any} | undefined>(undefined);
  
  const colorScheme = useColorScheme();
  
  const [state, dispatch] = React.useReducer(
      (prevState: any, action: any) => {
          switch (action.type) {
              case 'RESTORE_TOKEN':
                return {
                  ...prevState,
                  userToken: action.token,
                  isLoading: false,
                };
              case 'SIGN_IN':
                return {
                  ...prevState,
                  isSignout: false,
                  userToken: action.token,
                };
              case 'SIGN_OUT':
                return {
                  ...prevState,
                  isSignout: true,
                  userToken: null,
                };
          }
      },
      {
        isLoading: true,
        isSignout: false,
        userToken: null,
      }
  );

  React.useEffect(() => {
      // Fetch the token from storage then navigate to our appropriate place
      const bootstrapAsync = async () => {
          let userToken;

          try {
              userToken = await SecureStore.getItemAsync('userToken');
          } catch (e) {
          // Restoring token failed
          }

          // After restoring token, we may need to validate it in production apps

          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      };

      bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: any) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data: any) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && !state.isLoading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, state.isLoading]);

  if (!loaded || state.isLoading) {
    return null;
  }

  return (
      <AuthContext.Provider value={authContext}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          {state.userToken === null ? (
              <Stack>
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen name="login" options={{ headerShown: true, title: 'Login' }} />
                  <Stack.Screen name="register" options={{ headerShown: true, title: 'Register' }} />
              </Stack>
          ) : (
              <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
                  <Stack.Screen name='songDetails/[id]' options={{ presentation: 'modal', title: 'Manage song' }} />
              </Stack>
          )}
          </ThemeProvider>
      </AuthContext.Provider>
  );
}
