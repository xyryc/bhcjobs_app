import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  OTPInput,
  REGEXP_ONLY_DIGITS,
  type OTPInputRef,
} from "input-otp-native";
import React, { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/ui/Button";
import { useAppDispatch } from "../store/hooks";
import { useVerifyOTPMutation } from "../store/services/authApi";
import { setCredentials } from "../store/slices/authSlice";
import { getErrorMessage } from "../utils/errorHandler";

export const VerifyOTPScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ phone?: string; email?: string }>();
  const [otp, setOtp] = useState("");
  const otpRef = useRef<OTPInputRef>(null);

  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();

  const dispatch = useAppDispatch();
  const phone = typeof params.phone === "string" ? params.phone : "";
  const email = typeof params.email === "string" ? params.email : "";

  const handleVerify = async (otpCode?: string) => {
    const otpToVerify = otpCode || otp;

    if (otpToVerify.length !== 4) {
      Alert.alert("Invalid OTP", "Please enter a 4-digit OTP");
      return;
    }

    if (!phone) {
      Alert.alert("Error", "Phone number not found. Please register again.");
      router.replace("/register");
      return;
    }

    try {
      const result = await verifyOTP({
        phone,
        otp: otpToVerify,
      }).unwrap();

      if (result.status && result.data) {
        // Save user data and token
        dispatch(
          setCredentials({
            token: result.data.token,
            user: {
              id: result.data.user_id,
              fullName: result.data.name,
              email: result.data.email,
              mobileNumber: result.data.phone,
            },
          }),
        );

        Alert.alert(
          "Success",
          result.message || "Account verified successfully!",
        );

        // navigate to home
        router.replace("/home");
        return;
      }

      Alert.alert("Verification Failed", result.message || "Invalid OTP");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      Alert.alert("Verification Failed", errorMessage);
      setOtp("");
      otpRef.current?.clear();
      otpRef.current?.focus();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-6 py-8">
          {/* Header */}
          <View className="items-center mb-8">
            <View className="bg-blue-100 rounded-full p-4 mb-4">
              <Ionicons
                name="shield-checkmark-outline"
                size={50}
                color="#3B82F6"
              />
            </View>
            <Text className="text-3xl font-bold text-blue-500 mb-2">
              Verify OTP
            </Text>
            <Text className="text-gray-600 text-center text-base">
              We've sent a 4-digit code to
            </Text>
            <Text className="text-gray-800 font-semibold text-base mt-1">
              {phone}
            </Text>
            {email && (
              <Text className="text-gray-600 text-sm mt-1">{email}</Text>
            )}
          </View>

          {/* OTP Input */}
          <View className="mb-8 items-center">
            <OTPInput
              ref={otpRef}
              maxLength={4}
              value={otp}
              onChange={setOtp}
              onComplete={handleVerify}
              pattern={REGEXP_ONLY_DIGITS}
              render={({ slots }) => (
                <View className="flex-row justify-center">
                  {slots.map((slot, index) => (
                    <Pressable key={index} onPress={slot.focus}>
                      <View
                        className={`mx-2 h-16 w-16 items-center justify-center rounded-lg border-2 bg-white ${
                          slot.isActive ? "border-blue-500" : "border-gray-300"
                        }`}
                      >
                        <Text className="text-2xl font-bold text-gray-900">
                          {slot.char ?? ""}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              )}
            />
          </View>

          {/* Verify Button */}
          <Button
            title="VERIFY OTP"
            onPress={() => handleVerify()}
            loading={isLoading}
            disabled={isLoading || otp.length !== 4}
          />

          {/* Back to Login */}
          <View className="mt-8 items-center">
            <TouchableOpacity onPress={() => router.replace("/")}>
              <Text className="text-gray-600 text-base">
                Wrong number?{" "}
                <Text className="text-blue-500 font-semibold">
                  Change Number
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
