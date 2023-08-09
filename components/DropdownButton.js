import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Dimensions } from 'react-native';

const DropdownButton = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const longestOption = options.reduce((a, b) => (a.length > b.length ? a : b), '');
  const { width: windowWidth } = Dimensions.get('window');
  const dropdownWidth = Math.min(windowWidth * 0.7, longestOption.length * 12); // Adjust width as needed

  const handlePress = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>
          {'All Lists'}
          <Text style={styles.selectText}>{isOpen ? '▲' : '▼'}</Text>
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={[styles.optionsContainer, { width: dropdownWidth }]}>
          <FlatList
            data={options}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleOptionSelect(item)}>
                <Text style={styles.option}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff', // White color for text
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectText: {
    paddingHorizontal: 5, // Add padding to the select text
    color: '#ffffff', // White color for the dropdown symbol
  },
  optionsContainer: {
    position: 'absolute',
    top: 40, // Position it right below the button (adjust as needed)
    left: 0,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 5,
    backgroundColor: 'transparent', // Transparent background for options container
    zIndex: 1,
  },
  option: {
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f0f0f0', // Background color for options (same as home screen background)
  },
});

export default DropdownButton;