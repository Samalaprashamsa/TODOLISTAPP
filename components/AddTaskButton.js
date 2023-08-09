import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddTaskButton = ({ navigation }) => {
  const handleAddTask = () => {
    navigation.navigate('NewPage'); // Replace 'NewPage' with the actual name of your new page
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleAddTask}>
      <Icon name="plus" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4682B4',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto', // This will shift the button to the rightmost side
    marginRight: 10, // Add some spacing to the right
  },
});

export default AddTaskButton;
