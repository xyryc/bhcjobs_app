import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useAppDispatch } from "../store/hooks";
import { useLoginMutation } from "../store/services/authApi";
import { setCredentials } from "../store/slices/authSlice";
import type { LoginFormData, LoginFormErrors } from "../types/authForms";
import { getErrorMessage } from "../utils/errorHandler";

export default function Index() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const dispatch = useAppDispatch();
  const isDark = colorScheme === "dark";
  const [login] = useLoginMutation();
  const [formData, setFormData] = useState<LoginFormData>({
    mobileNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^01[0-9]{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid 11-digit mobile number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const result = await login({
        phone: formData.mobileNumber.trim(),
        password: formData.password,
      }).unwrap();

      if (result.status && result.data?.token) {
        dispatch(
          setCredentials({
            token: result.data.token,
            user: {
              mobileNumber: formData.mobileNumber.trim(),
            },
          }),
        );
        Alert.alert("Success", result.message || "Logged in successfully.");
        router.replace("/home");
        return;
      }

      Alert.alert("Login Failed", result.message || "Login failed.");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      Alert.alert("Login Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-950">
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-6 py-8"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="mb-8 items-center">
            <View className="mb-4 rounded-full bg-blue-100 p-4 dark:bg-blue-950">
              <Ionicons name="person-outline" size={40} color="#3B82F6" />
            </View>
            <Text className="text-3xl font-bold text-blue-500">
              Job Seeker Login
            </Text>
          </View>

          <Input
            label="Mobile Number"
            icon="call-outline"
            placeholder="01XXXXXXXXX"
            value={formData.mobileNumber}
            onChangeText={(text) => updateField("mobileNumber", text)}
            error={errors.mobileNumber}
            keyboardType="phone-pad"
            maxLength={11}
            autoFocus
          />

          <Input
            label="Password"
            icon="lock-closed-outline"
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={(text) => updateField("password", text)}
            error={errors.password}
            isPassword
          />

          <Button
            title="SIGN IN"
            onPress={handleSignIn}
            loading={loading}
            disabled={loading}
          />

          <View className="my-6 flex-row items-center">
            <View className="h-px flex-1 bg-gray-300 dark:bg-gray-700" />
            <Text className="mx-4 text-gray-500 dark:text-gray-400">OR</Text>
            <View className="h-px flex-1 bg-gray-300 dark:bg-gray-700" />
          </View>

          <View className="flex-row items-center justify-center">
            <Text className="text-base text-gray-700 dark:text-gray-200">
              New to BhcJobs.com?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text className="text-base font-semibold text-blue-500">
                Create an account
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
