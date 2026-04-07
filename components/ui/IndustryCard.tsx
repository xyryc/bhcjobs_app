import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import type { Industry } from "../../types/home";

interface IndustryCardProps {
  industry: Industry;
  onPress?: (industry: Industry) => void;
}

export const IndustryCard = ({ industry, onPress }: IndustryCardProps) => {
  return (
    <TouchableOpacity
      className="h-32 px-2 flex-1 items-center justify-center rounded-2xl border border-gray-200 bg-white"
      activeOpacity={0.8}
      onPress={() => onPress?.(industry)}
    >
      <Image
        source={{
          uri: `${process.env.EXPO_PUBLIC_API_BASE_URL}/storage/industry-image/${industry.image}`,
        }}
        className="h-8 w-8"
        resizeMode="contain"
      />

      <Text
        className="my-1 text-center text-base font-bold text-gray-700"
        numberOfLines={2}
      >
        {industry.name}
      </Text>
      <Text className="text-center text-sm font-medium text-gray-500">
        {industry.jobs_count} Available Jobs
      </Text>
    </TouchableOpacity>
  );
};
