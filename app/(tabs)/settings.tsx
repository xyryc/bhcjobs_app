import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import React from "react";
import { StatusBar, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { THEME_STORAGE_KEY, type AppTheme } from "../../utils/theme";

export default function SettingsScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleThemeChange = async (theme: AppTheme) => {
    setColorScheme(theme);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
  };

  const handleToggle = async (value: boolean) => {
    await handleThemeChange(value ? "dark" : "light");
  };

  return (
    <SafeAreaView
      className="flex-1 bg-gray-50 dark:bg-gray-950"
      edges={["top", "left", "right"]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <View className="flex-1 px-6 py-8">
        <Text className="text-3xl font-semibold text-gray-900 dark:text-white">
          Settings
        </Text>
        <Text className="mt-2 text-base text-gray-500 dark:text-gray-400">
          Choose how the app looks.
        </Text>

        <View className="mt-5 flex-row items-center justify-between rounded-2xl bg-gray-50 px-4 py-4 dark:bg-gray-800 elevation-sm">
          <Text className="text-base font-semibold text-gray-900 dark:text-white">
            Dark Mode
          </Text>

          <Switch
            value={isDark}
            onValueChange={handleToggle}
            trackColor={{ false: "#D1D5DB", true: "#60A5FA" }}
            thumbColor={isDark ? "#2563EB" : "#F9FAFB"}
            ios_backgroundColor="#D1D5DB"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
