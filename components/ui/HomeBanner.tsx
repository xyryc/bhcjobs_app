import React from "react";
import { Text, View } from "react-native";
import { BannerWave } from "./BannerWave";

export const HomeBanner = () => {
  return (
    <View className="pb-2">
      <View className="items-center overflow-hidden bg-blue-600 px-5 pb-20 pt-10 dark:bg-blue-900">
        <View className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />
        <View className="absolute -bottom-14 -left-8 h-36 w-36 rounded-full bg-cyan-300/15" />

        <View className="rounded-full bg-white/15 px-3 py-1">
          <Text className="text-xs font-semibold uppercase tracking-widest text-blue-50">
            #1 Platform For Saudi Jobs
          </Text>
        </View>

        <Text className="mt-4 text-center text-3xl font-bold leading-10 text-white">
          Apply for jobs in Saudi Arabia with verified employers.
        </Text>

        <Text className="mt-3 max-w-[92%] text-center text-base leading-6 text-blue-100">
          We connect Bangladeshi workforce with high-demand Saudi jobs.
        </Text>

        <View className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden bg-transparent">
          <BannerWave />
        </View>
      </View>
    </View>
  );
};
