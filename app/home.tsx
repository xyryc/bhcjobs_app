import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CompanyCard } from "../components/ui/CompanyCard";
import { ErrorState } from "../components/ui/ErrorState";
import { IndustryCard } from "../components/ui/IndustryCard";
import { JobCard } from "../components/ui/JobCard";
import { LoadingState } from "../components/ui/LoadingState";
import { SectionHeader } from "../components/ui/SectionHeader";
import {
  useGetCompaniesQuery,
  useGetIndustriesQuery,
  useGetJobsQuery,
} from "../store/services/homeApi";
import type { Company, Industry, Job } from "../types/home";

export default function HomeScreen() {
  const {
    data: industriesResponse,
    isLoading: industriesLoading,
    isFetching: industriesFetching,
    isError: industriesError,
  } = useGetIndustriesQuery();
  const {
    data: companiesResponse,
    isLoading: companiesLoading,
    isFetching: companiesFetching,
    isError: companiesError,
  } = useGetCompaniesQuery();
  const {
    data: jobsResponse,
    isLoading: jobsLoading,
    isFetching: jobsFetching,
    isError: jobsError,
  } = useGetJobsQuery();

  if (industriesLoading && companiesLoading && jobsLoading) {
    return <LoadingState message="Loading home data..." />;
  }

  if (industriesError && companiesError && jobsError) {
    return <ErrorState message="Failed to load home data. Please try again." />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <SectionHeader title="Popular Industries" />

        {industriesFetching && (
          <Text className="px-6 pb-2 text-center text-sm text-gray-500">
            Refreshing industries...
          </Text>
        )}

        {industriesError ? (
          <View className="items-center px-6 pb-8">
            <Text className="text-center text-sm text-red-500">
              Failed to load industries.
            </Text>
          </View>
        ) : (
          <FlatList
            data={industriesResponse?.data ?? []}
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
                <Text className="text-gray-500">No industries found.</Text>
              </View>
            }
          />
        )}

        <SectionHeader
          title="Popular Companies"
          containerClassName="items-center pb-6 pt-2"
        />

        {companiesFetching && (
          <Text className="px-6 pb-2 text-center text-sm text-gray-500">
            Refreshing companies...
          </Text>
        )}

        {companiesError ? (
          <View className="items-center px-6 pb-8">
            <Text className="text-center text-sm text-red-500">
              Failed to load companies.
            </Text>
          </View>
        ) : (
          <FlatList
            data={companiesResponse?.data ?? []}
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
                <Text className="text-gray-500">No companies found.</Text>
              </View>
            }
          />
        )}

        <SectionHeader
          title="Recommended Jobs"
          containerClassName="items-center pb-6 pt-2"
        />

        {jobsFetching && (
          <Text className="px-6 pb-2 text-center text-sm text-gray-500">
            Refreshing jobs...
          </Text>
        )}

        {jobsError ? (
          <View className="items-center px-6 pb-8">
            <Text className="text-center text-sm text-red-500">
              Failed to load jobs.
            </Text>
          </View>
        ) : (
          <FlatList
            data={jobsResponse?.data ?? []}
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
                <Text className="text-gray-500">No jobs found.</Text>
              </View>
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
