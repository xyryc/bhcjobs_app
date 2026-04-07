import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ErrorStateProps {
  message?: string;
}

export const ErrorState = ({
  message = "Something went wrong.",
}: ErrorStateProps) => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-50 px-6">
      <Text className="text-center text-base text-red-500">{message}</Text>
    </SafeAreaView>
  );
};
