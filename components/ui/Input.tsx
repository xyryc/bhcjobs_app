import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  required?: boolean;
  isPassword?: boolean;
}

export const Input = ({
  label,
  icon,
  error,
  required = false,
  isPassword = false,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="mb-4">
      <Text className="mb-2 text-base font-semibold text-gray-800 dark:text-gray-100">
        {label} {required && <Text className="text-red-500">*</Text>}
      </Text>
      <View
        className={`flex-row items-center border rounded-lg px-4 ${
          error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
        } bg-white dark:bg-gray-900`}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color="#9CA3AF"
            style={{ marginRight: 12 }}
          />
        )}
        <TextInput
          className="flex-1 py-3 text-base text-gray-800 dark:text-gray-100"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="mt-1 text-sm text-red-500">{error}</Text>}
    </View>
  );
};
