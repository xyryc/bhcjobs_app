import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
}) => {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`py-4 rounded-lg ${
        isPrimary ? 'bg-blue-500' : 'bg-gray-200'
      } ${(disabled || loading) && 'opacity-50'}`}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? 'white' : '#374151'} />
      ) : (
        <Text
          className={`text-center font-semibold text-base ${
            isPrimary ? 'text-white' : 'text-gray-800'
          }`}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
