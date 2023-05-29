import React, { useCallback, useEffect, useState } from 'react';

// react navigation stack
import RootStack from './navigators/RootStack';

// splash screen
import * as SplashScreen from 'expo-splash-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CredentialsContext } from './components/CredentialsContext';
import { View } from 'react-native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState('');

  const checkLoginCredentials = () => {
    AsyncStorage
    .getItem('scavenger_hunt_token')
    .then((result) => {
      if (result !== null) {
        setStoredCredentials(JSON.parse(result))
      } else {
        setStoredCredentials(null);
      }
    })
    .catch(error => console.log(error));
  }

  useEffect(() => {
    async function prepare() {
      try {
        // Would be where we Pre-load fonts, make any API calls you need to do here
        checkLoginCredentials();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
      return null;
  }

  return (
    <CredentialsContext.Provider value={{storedCredentials, setStoredCredentials}}>
        <View onLayout={onLayoutRootView} style={{flex: 1}}>
          <RootStack />
        </View>
      </CredentialsContext.Provider>
  );

 
}
