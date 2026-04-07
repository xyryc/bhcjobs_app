import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ErrorState } from "../components/ui/ErrorState";
import { IndustryCard } from "../components/ui/IndustryCard";
import { LoadingState } from "../components/ui/LoadingState";
import { useGetIndustriesQuery } from "../store/services/homeApi";
import type { Industry } from "../types/home";

export default function HomeScreen() {
  const {
    data: industries,
    isLoading,
    isFetching,
    isError,
  } = useGetIndustriesQuery();

  if (isLoading) {
    return <LoadingState message="Loading industries..." />;
  }

  if (isError) {
    return <ErrorState message="Failed to load industries. Please try again." />;
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="items-center p-6">
        <View className="rounded-full bg-blue-100 px-4 py-2">
          <Text className="text-sm font-bold text-gray-700">
            Popular Industries
          </Text>
        </View>
      </View>

      {isFetching && (
        <Text className="px-6 pb-2 text-center text-sm text-gray-500">
          Refreshing...
        </Text>
      )}

      <FlatList
        data={industries?.data || []}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: Industry }) => (
          <IndustryCard industry={item} />
        )}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}
        columnWrapperStyle={{ gap: 12, marginBottom: 12 }}
        ListEmptyComponent={
          <View className="items-center py-10">
            <Text className="text-gray-500">No industries found.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
