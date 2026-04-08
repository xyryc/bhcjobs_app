import React from "react";
import { FlatList, Text, View } from "react-native";
import { Job } from "../../types/home";
import { JobCard } from "./JobCard";
import { SectionHeader } from "./SectionHeader";

interface JobsSectionProps {
  jobs: Job[];
  isFetching: boolean;
  isError: boolean;
}

export const JobsSection = ({
  jobs,
  isFetching,
  isError,
}: JobsSectionProps) => {
  return (
    <>
      <SectionHeader
        title="Recommended Jobs"
        containerClassName="items-center pb-6 pt-2"
      />

      {isFetching && (
        <Text className="px-6 pb-2 text-center text-sm text-gray-500 dark:text-gray-400">
          Refreshing jobs...
        </Text>
      )}

      {isError ? (
        <View className="items-center px-6 pb-8">
          <Text className="text-center text-sm text-red-500 dark:text-red-400">
            Failed to load jobs.
          </Text>
        </View>
      ) : (
        <FlatList
          data={jobs}
          numColumns={1}
          scrollEnabled={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }: { item: Job }) => <JobCard job={item} />}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 12,
          }}
          ListEmptyComponent={
            <View className="items-center py-10">
              <Text className="text-gray-500 dark:text-gray-400">
                No jobs found.
              </Text>
            </View>
          }
        />
      )}
    </>
  );
};
