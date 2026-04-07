import React from "react";
import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
}) => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-50">
      <ActivityIndicator size="large" color="#2563EB" />
      <Text className="mt-3 text-gray-600">{message}</Text>
    </SafeAreaView>
  );
};
