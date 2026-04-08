import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { colorScheme } from "nativewind";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { THEME_STORAGE_KEY, isAppTheme } from "../utils/theme";
import "../global.css";

export default function RootLayout() {
  const [isThemeReady, setIsThemeReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadThemePreference = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);

        if (isAppTheme(storedTheme)) {
          colorScheme.set(storedTheme);
        }
      } finally {
        if (isMounted) {
          setIsThemeReady(true);
        }
      }
    };

    loadThemePreference();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!isThemeReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }} />
    </Provider>
  );
}
