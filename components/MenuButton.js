import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const MenuButton = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  const handleMenuPress = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleOptionSelect = (option) => {
    console.log('Selected Menu Option:', option);
    // Implement the functionality for each menu option here

    // For demonstration purposes, let's add some functionality based on the selected option
    switch (option) {
      case 'Option 1':
        console.log('Option 1 selected. Implement your logic here for Option 1.');
        // Implement the logic for Option 1
        break;
      case 'Option 2':
        console.log('Option 2 selected. Implement your logic here for Option 2.');
        // Implement the logic for Option 2
        break;
      case 'Option 3':
        console.log('Option 3 selected. Implement your logic here for Option 3.');
        // Implement the logic for Option 3
        break;
      default:
        console.log('Unknown option selected.');
    }

    // Close the menu after selecting an option
    setMenuVisible(false);
  };

  const menuOptions = ['Follow us', 'Invite friends to the app', 'Settings'];

  // Calculate the maximum width of the options
  const maxOptionWidth = Math.max(...menuOptions.map((option) => option.length * 9));

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMenuPress}>
        <Text style={styles.menuIcon}>...</Text>
      </TouchableOpacity>
      {isMenuVisible && (
        <View style={[styles.menu, { width: maxOptionWidth }]}>
          <FlatList
            ref={menuRef}
            data={menuOptions}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleOptionSelect(item)}>
                <Text style={styles.menuOption}>{item}</Text>
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
  menuIcon: {
    fontSize: 24,
    color: '#fff',
    paddingHorizontal: 10,
    transform: [{ rotate: '90deg' }], // Rotate the three-dot menu icon vertically
  },
  menu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1,
  },
  menuOption: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
});

export default MenuButton;

