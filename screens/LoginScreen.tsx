import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import type { LoginFormData, LoginFormErrors } from "../types/authForms";

export const LoginScreen = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    mobileNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    // Mobile Number validation
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^01[0-9]{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid 11-digit mobile number";
    }

    // Password validation
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
      console.log("Login data:", formData);

      // navigate to home
      router.replace("/home");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    router.push("/register");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
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
          {/* Header with Icon */}
          <View className="items-center mb-8">
            <View className="bg-blue-100 rounded-full p-4 mb-4">
              <Ionicons name="person-outline" size={40} color="#3B82F6" />
            </View>
            <Text className="text-3xl font-bold text-blue-500">
              Job Seeker Login
            </Text>
          </View>

          {/* Mobile Number Input */}
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

          {/* Password Input */}
          <Input
            label="Password"
            icon="lock-closed-outline"
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={(text) => updateField("password", text)}
            error={errors.password}
            isPassword
          />

          {/* Sign In Button */}
          <Button
            title="SIGN IN"
            onPress={handleSignIn}
            loading={loading}
            disabled={loading}
          />

          {/* Divider */}
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-gray-500">OR</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Create Account Link */}
          <View className="flex-row justify-center items-center">
            <Text className="text-gray-700 text-base">
              New to BhcJobs.com?{" "}
            </Text>
            <TouchableOpacity onPress={handleCreateAccount}>
              <Text className="text-blue-500 font-semibold text-base">
                Create an account
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
