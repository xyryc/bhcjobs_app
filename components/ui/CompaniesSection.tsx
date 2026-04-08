import React from "react";
import { FlatList, Text, View } from "react-native";
import { Company } from "../../types/home";
import { CompanyCard } from "./CompanyCard";
import { SectionHeader } from "./SectionHeader";

interface CompaniesSectionProps {
  companies: Company[];
  isFetching: boolean;
  isError: boolean;
}

export const CompaniesSection = ({
  companies,
  isFetching,
  isError,
}: CompaniesSectionProps) => {
  return (
    <>
      <SectionHeader
        title="Popular Companies"
        containerClassName="items-center pb-6 pt-2"
      />

      {isFetching && (
        <Text className="px-6 pb-2 text-center text-sm text-gray-500 dark:text-gray-400">
          Refreshing companies...
        </Text>
      )}

      {isError ? (
        <View className="items-center px-6 pb-8">
          <Text className="text-center text-sm text-red-500 dark:text-red-400">
            Failed to load companies.
          </Text>
        </View>
      ) : (
        <FlatList
          data={companies}
          numColumns={2}
          scrollEnabled={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }: { item: Company }) => (
            <View className="flex-1">
              <CompanyCard company={item} />
            </View>
          )}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 12,
          }}
          columnWrapperStyle={{ gap: 12, marginBottom: 12 }}
          ListEmptyComponent={
            <View className="items-center py-10">
              <Text className="text-gray-500 dark:text-gray-400">
                No companies found.
              </Text>
            </View>
          }
        />
      )}
    </>
  );
};
