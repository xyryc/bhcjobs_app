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
import { Checkbox } from "../components/ui/Checkbox";
import { DatePicker } from "../components/ui/DatePicker";
import { Input } from "../components/ui/Input";
import { Picker } from "../components/ui/Picker";
import { useRegisterMutation } from "../store/services/authApi";
import type { RegisterFormData, RegisterFormErrors } from "../types/authForms";
import { getErrorMessage } from "../utils/errorHandler";

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

export default function RegisterRoute() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const [register] = useRegisterMutation();
  const isDark = colorScheme === "dark";
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    mobileNumber: "",
    dateOfBirth: null,
    passportNo: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateField = (
    field: keyof RegisterFormData,
    value: string | Date | null,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: RegisterFormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^01[0-9]{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid 11-digit mobile number";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const age = new Date().getFullYear() - formData.dateOfBirth.getFullYear();
      if (age < 18) {
        newErrors.dateOfBirth = "You must be at least 18 years old";
      }
    }

    if (!formData.passportNo.trim()) {
      newErrors.passportNo = "Passport number is required";
    } else if (formData.passportNo.trim().length < 6) {
      newErrors.passportNo = "Please enter a valid passport number";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDateForApi = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    if (!agreeToTerms) {
      alert("Please agree to Terms of Service and Privacy Policy");
      return;
    }

    setLoading(true);

    try {
      if (!formData.dateOfBirth) {
        alert("Date of birth is required");
        return;
      }

      const payload = {
        name: formData.fullName.trim(),
        phone: formData.mobileNumber.trim(),
        dob: formatDateForApi(formData.dateOfBirth),
        passport_number: formData.passportNo.trim(),
        gender: formData.gender,
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        confirm_password: formData.confirmPassword,
      };

      const response = await register(payload).unwrap();
      alert(response.message || "Registration successful!");
      router.push({
        pathname: "/verify-otp",
        params: {
          phone: response.data?.phone || formData.mobileNumber.trim(),
          email: response.data?.email || formData.email.trim().toLowerCase(),
        },
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      Alert.alert("Registration Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-950">
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 16 : 24}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-6 py-8"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <Text className="mb-8 text-center text-3xl font-bold text-blue-500">
            Create an account
          </Text>

          <Input
            label="Full Name"
            icon="person-outline"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChangeText={(text) => updateField("fullName", text)}
            error={errors.fullName}
            required
            autoCapitalize="words"
          />

          <Input
            label="Mobile Number"
            icon="call-outline"
            placeholder="01XXXXXXXXX"
            value={formData.mobileNumber}
            onChangeText={(text) => updateField("mobileNumber", text)}
            error={errors.mobileNumber}
            required
            keyboardType="phone-pad"
            maxLength={11}
          />

          <DatePicker
            label="Date of Birth"
            value={formData.dateOfBirth}
            onChange={(date) => updateField("dateOfBirth", date)}
            error={errors.dateOfBirth}
            required
          />

          <Input
            label="Passport No"
            icon="globe-outline"
            placeholder="Enter your passport number"
            value={formData.passportNo}
            onChangeText={(text) =>
              updateField("passportNo", text.toUpperCase())
            }
            error={errors.passportNo}
            required
            autoCapitalize="characters"
          />

          <Picker
            label="Gender"
            icon="person-outline"
            value={formData.gender}
            options={genderOptions}
            onChange={(value) => updateField("gender", value)}
            placeholder="Select gender"
            error={errors.gender}
            required
          />

          <Input
            label="Email Address"
            icon="mail-outline"
            placeholder="Enter your email address"
            value={formData.email}
            onChangeText={(text) => updateField("email", text.toLowerCase())}
            error={errors.email}
            required
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password"
            icon="lock-closed-outline"
            placeholder="Enter your new password"
            value={formData.password}
            onChangeText={(text) => updateField("password", text)}
            error={errors.password}
            required
            isPassword
          />

          <Input
            label="Confirm Password"
            icon="lock-closed-outline"
            placeholder="Enter your new password"
            value={formData.confirmPassword}
            onChangeText={(text) => updateField("confirmPassword", text)}
            error={errors.confirmPassword}
            required
            isPassword
          />

          <View className="mb-6">
            <Checkbox
              checked={agreeToTerms}
              onChange={setAgreeToTerms}
              label={
                <Text className="text-sm text-gray-700 dark:text-gray-200">
                  By continuing, you agree to our{" "}
                  <Text className="text-blue-500 font-semibold">
                    Terms of Service
                  </Text>{" "}
                  and{" "}
                  <Text className="text-blue-500 font-semibold">
                    Privacy Policy
                  </Text>
                </Text>
              }
            />
          </View>

          <Button
            title="SIGN UP"
            onPress={handleSignUp}
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
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.replace("/")}>
              <Text className="text-base font-semibold text-blue-500">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
