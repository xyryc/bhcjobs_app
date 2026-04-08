import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  error?: string;
  required?: boolean;
}

export const DatePicker = ({
  label,
  value,
  onChange,
  error,
  required = false,
}: DatePickerProps) => {
  const [show, setShow] = useState(false);

  const handleChange = (event: any, selectedDate?: Date) => {
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Select Date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View className="mb-4">
      <Text className="mb-2 text-base font-semibold text-gray-800 dark:text-gray-100">
        {label} {required && <Text className="text-red-500">*</Text>}
      </Text>
      <TouchableOpacity
        onPress={() => setShow(true)}
        className={`border rounded-lg px-4 py-3 ${
          error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
        } bg-white dark:bg-gray-900`}
      >
        <Text
          className={
            value
              ? 'text-gray-800 dark:text-gray-100'
              : 'text-gray-400 dark:text-gray-500'
          }
        >
          {formatDate(value)}
        </Text>
      </TouchableOpacity>
      {error && <Text className="mt-1 text-sm text-red-500">{error}</Text>}

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};
