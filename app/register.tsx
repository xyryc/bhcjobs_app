import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-2xl font-bold text-gray-900 mb-2">Register</Text>
      <Text className="text-gray-600 text-center">
        Registration screen placeholder.
      </Text>
      <TouchableOpacity onPress={() => router.back()} className="mt-6">
        <Text className="text-blue-500 font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
