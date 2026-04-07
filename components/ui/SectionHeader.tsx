import React from "react";
import { Text, View } from "react-native";

interface SectionHeaderProps {
  title: string;
  containerClassName?: string;
}

export const SectionHeader = ({
  title,
  containerClassName = "items-center p-6",
}: SectionHeaderProps) => {
  return (
    <View className={containerClassName}>
      <View className="rounded-full bg-blue-100 px-4 py-2">
        <Text className="text-sm font-bold text-gray-700">{title}</Text>
      </View>
    </View>
  );
};
