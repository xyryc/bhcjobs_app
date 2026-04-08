import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
}

export const Checkbox = ({
  checked,
  onChange,
  label,
}: CheckboxProps) => {
  return (
    <TouchableOpacity
      onPress={() => onChange(!checked)}
      className="flex-row items-center"
    >
      <View
        className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${
          checked
            ? 'bg-blue-500 border-blue-500'
            : 'border-gray-400 dark:border-gray-500'
        }`}
      >
        {checked && <Ionicons name="checkmark" size={14} color="white" />}
      </View>
      {label && <View className="flex-1">{label}</View>}
    </TouchableOpacity>
  );
};
