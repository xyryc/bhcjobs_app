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

export const Input: React.FC<InputProps> = ({
  label,
  icon,
  error,
  required = false,
  isPassword = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="mb-4">
      <Text className="text-gray-800 font-semibold mb-2 text-base">
        {label} {required && <Text className="text-red-500">*</Text>}
      </Text>
      <View
        className={`flex-row items-center border rounded-lg px-4 ${
          error ? 'border-red-500' : 'border-gray-300'
        } bg-white`}
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
          className="flex-1 py-3 text-gray-800 text-base"
          placeholderTextColor="#D1D5DB"
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
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};
