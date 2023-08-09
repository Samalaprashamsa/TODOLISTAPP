import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';

const SetDate = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedRepeat, setSelectedRepeat] = useState('once_a_day'); // Set the default repeat option

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    setSelectedTime(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    hideTimePicker();
  };

  const repeatOptions = [
    { label: 'Once a day', value: 'once_a_day' },
    { label: 'Once a week', value: 'once_a_week' },
    { label: 'Once a month', value: 'once_a_month' },
  ];

  return (
    <View style={styles.container}>
      {/* Date picker */}
      <TouchableOpacity onPress={showDatePicker}>
        <View style={styles.inputContainer}>
          <Icon name="calendar" size={20} color="black" style={styles.icon} />
          <Text>{selectedDate || 'Select a date'}</Text>
        </View>
      </TouchableOpacity>

      {/* Time picker */}
      <TouchableOpacity onPress={showTimePicker}>
        <View style={styles.inputContainer}>
          <Icon name="clock" size={20} color="black" style={styles.icon} />
          <Text>{selectedTime || 'Select a time'}</Text>
        </View>
      </TouchableOpacity>

      {/* Date picker modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      {/* Time picker modal */}
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />

      {/* Repeat dropdown */}
      <View style={styles.pickerContainer}>
        <Icon name="repeat" size={20} color="black" style={styles.icon} />
        <Picker
          selectedValue={selectedRepeat}
          style={styles.dropdown}
          onValueChange={(itemValue, itemIndex) => setSelectedRepeat(itemValue)}
        >
          {repeatOptions.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  dropdown: {
    flex: 1,
  },
});

export default SetDate;
