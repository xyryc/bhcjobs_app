import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PickerOption {
  label: string;
  value: string;
}

interface PickerProps {
  label: string;
  value: string;
  options: PickerOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
}

export const Picker = ({
  label,
  value,
  options,
  onChange,
  placeholder = 'Select an option',
  error,
  required = false,
  icon,
}: PickerProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <View className="mb-4">
      <Text className="text-gray-800 font-semibold mb-2 text-base">
        {label} {required && <Text className="text-red-500">*</Text>}
      </Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className={`flex-row items-center border rounded-lg px-4 py-3 ${
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
        <Text
          className={`flex-1 ${
            selectedOption ? 'text-gray-800' : 'text-gray-400'
          }`}
        >
          {selectedOption?.label || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
      </TouchableOpacity>
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50"
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-end">
            <View className="bg-white rounded-t-3xl max-h-96">
              <View className="p-4 border-b border-gray-200">
                <Text className="text-lg font-semibold text-center">
                  {label}
                </Text>
              </View>
              <FlatList
                data={options}
                keyExtractor={item => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      onChange(item.value);
                      setModalVisible(false);
                    }}
                    className="px-6 py-4 border-b border-gray-100"
                  >
                    <Text
                      className={`text-base ${
                        value === item.value
                          ? 'text-blue-500 font-semibold'
                          : 'text-gray-800'
                      }`}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
