import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import type { Company } from "../../types/home";

interface CompanyCardProps {
  company: Company;
  onPress?: (company: Company) => void;
}

export const CompanyCard = ({ company, onPress }: CompanyCardProps) => {
  return (
    <TouchableOpacity
      className="h-28 flex-1 flex-row items-center rounded-2xl border border-gray-200 bg-white px-3 dark:border-gray-800 dark:bg-gray-900"
      activeOpacity={0.8}
      onPress={() => onPress?.(company)}
    >
      <Image
        source={{
          uri: `${process.env.EXPO_PUBLIC_STORAGE_BASE_URL}/company-image/${company.image}`,
        }}
        className="h-10 w-10 rounded-md"
        resizeMode="contain"
      />

      <View className="ml-3 flex-1">
        <Text
          className="text-base font-bold text-gray-700 dark:text-gray-100"
          numberOfLines={2}
        >
          {company.name}
        </Text>
        <Text className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
          {company.jobs_count} Available Jobs
        </Text>
      </View>
    </TouchableOpacity>
  );
};
