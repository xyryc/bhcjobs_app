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
import { Checkbox } from "../components/ui/Checkbox";
import { DatePicker } from "../components/ui/DatePicker";
import { Input } from "../components/ui/Input";
import { Picker } from "../components/ui/Picker";

interface FormData {
  fullName: string;
  mobileNumber: string;
  dateOfBirth: Date | null;
  passportNo: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  fullName?: string;
  mobileNumber?: string;
  dateOfBirth?: string;
  passportNo?: string;
  gender?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

export const RegisterScreen = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    mobileNumber: "",
    dateOfBirth: null,
    passportNo: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    // Mobile Number validation
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^01[0-9]{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid 11-digit mobile number";
    }

    // Date of Birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const age = new Date().getFullYear() - formData.dateOfBirth.getFullYear();
      if (age < 18) {
        newErrors.dateOfBirth = "You must be at least 18 years old";
      }
    }

    // Passport validation
    if (!formData.passportNo.trim()) {
      newErrors.passportNo = "Passport number is required";
    } else if (formData.passportNo.trim().length < 6) {
      newErrors.passportNo = "Please enter a valid passport number";
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      console.log("Form data:", formData);

      alert("Registration successful!");
      router.replace("/home");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
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
        >
          <Text className="text-3xl font-bold text-blue-500 text-center mb-8">
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
                <Text className="text-gray-700 text-sm">
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

          <View className="flex-row items-center my-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-gray-500">OR</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          <View className="flex-row justify-center items-center">
            <Text className="text-gray-700 text-base">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.replace("/")}>
              <Text className="text-blue-500 font-semibold text-base">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
