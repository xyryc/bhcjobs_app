import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import type { Job } from "../../types/home";

interface JobCardProps {
  job: Job;
  onPress?: (job: Job) => void;
}

const formatSalary = (job: Job) => {
  const currency = job.currency ?? "SAR";

  if (job.min_salary && job.max_salary) {
    return `${currency} ${job.min_salary} - ${job.max_salary}`;
  }

  if (job.min_salary) {
    return `${currency} ${job.min_salary}+`;
  }

  return "Salary not specified";
};

export const JobCard = ({ job, onPress }: JobCardProps) => {
  let foodText: string | null = null;

  if (job.food_option === "allowance" && job.food_amount) {
    foodText = `Food: Allowance ${job.food_amount}`;
  } else if (job.food_option === "provided") {
    foodText = "Food: Provided";
  }

  return (
    <TouchableOpacity
      className="mb-3 rounded-2xl border border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-900"
      activeOpacity={0.8}
      onPress={() => onPress?.(job)}
    >
      <View className="flex-row items-start">
        {job.company?.image ? (
          <Image
            source={{
              uri: `${process.env.EXPO_PUBLIC_STORAGE_BASE_URL}/company-image/${job.company.image}`,
            }}
            className="h-12 w-12 rounded-md border border-gray-200 dark:border-gray-700"
            resizeMode="cover"
          />
        ) : null}

        <View className={job.company?.image ? "ml-3 flex-1" : "flex-1"}>
          <Text
            className="text-base font-bold text-gray-800 dark:text-gray-100"
            numberOfLines={1}
          >
            {job.job_title}
          </Text>
          <Text
            className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400"
            numberOfLines={1}
          >
            {job.company_name}
          </Text>
        </View>
      </View>

      <Text className="mt-2 text-sm font-semibold text-blue-600">
        {formatSalary(job)}
      </Text>
      {foodText ? (
        <Text className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
          {foodText}
        </Text>
      ) : null}

      <View className="flex-row items-center mt-2">
        <View className="mr-2 rounded-full bg-blue-100 px-3 py-1 dark:bg-blue-950">
          <Text className="text-xs font-medium capitalize text-blue-700 dark:text-blue-200">
            <SimpleLineIcons name="location-pin" size={10} color="#1d4ed8" />{" "}
            {job?.country?.name}
          </Text>
        </View>

        <View className="mr-2 rounded-full bg-blue-100 px-3 py-1 dark:bg-blue-950">
          <Text className="text-xs font-medium capitalize text-blue-700 dark:text-blue-200">
            <Ionicons name="briefcase-outline" size={10} color="#1d4ed8" />{" "}
            {job?.type}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
