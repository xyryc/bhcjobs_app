import React from "react";
import { FlatList, Text, View } from "react-native";
import { Industry } from "../../types/home";
import { IndustryCard } from "./IndustryCard";
import { SectionHeader } from "./SectionHeader";

interface IndustriesSectionProps {
  industries: Industry[];
  isFetching: boolean;
  isError: boolean;
}

export const IndustriesSection = ({
  industries,
  isFetching,
  isError,
}: IndustriesSectionProps) => {
  return (
    <>
      <SectionHeader title="Popular Industries" />

      {isFetching && (
        <Text className="px-6 pb-2 text-center text-sm text-gray-500 dark:text-gray-400">
          Refreshing industries...
        </Text>
      )}

      {isError ? (
        <View className="items-center px-6 pb-8">
          <Text className="text-center text-sm text-red-500 dark:text-red-400">
            Failed to load industries.
          </Text>
        </View>
      ) : (
        <FlatList
          data={industries}
          numColumns={2}
          scrollEnabled={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }: { item: Industry }) => (
            <View className="flex-1">
              <IndustryCard industry={item} />
            </View>
          )}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 24,
          }}
          columnWrapperStyle={{ gap: 12, marginBottom: 12 }}
          ListEmptyComponent={
            <View className="items-center py-10">
              <Text className="text-gray-500 dark:text-gray-400">
                No industries found.
              </Text>
            </View>
          }
        />
      )}
    </>
  );
};
