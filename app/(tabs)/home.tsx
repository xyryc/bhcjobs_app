import { useColorScheme } from "nativewind";
import React from "react";
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CompaniesSection } from "../../components/ui/CompaniesSection";
import { ErrorState } from "../../components/ui/ErrorState";
import { HomeBanner } from "../../components/ui/HomeBanner";
import { IndustriesSection } from "../../components/ui/IndustriesSection";
import { JobsSection } from "../../components/ui/JobsSection";
import { LoadingState } from "../../components/ui/LoadingState";
import {
  useGetCompaniesQuery,
  useGetIndustriesQuery,
  useGetJobsQuery,
} from "../../store/services/homeApi";

export default function HomeScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

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
    <SafeAreaView
      className="flex-1 bg-gray-50 dark:bg-gray-950"
      edges={["top", "left", "right"]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <HomeBanner />

        <IndustriesSection
          industries={industriesResponse?.data ?? []}
          isFetching={industriesFetching}
          isError={industriesError}
        />

        <JobsSection
          jobs={jobsResponse?.data ?? []}
          isFetching={jobsFetching}
          isError={jobsError}
        />

        <CompaniesSection
          companies={companiesResponse?.data ?? []}
          isFetching={companiesFetching}
          isError={companiesError}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
