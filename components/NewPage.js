// NewPage.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, handleSetTime } from 'react-native';
import SetDate from './SetDate';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Voice from '@react-native-community/voice';
import firebase from '@react-native-firebase/app';

const NewPage = ({ navigation, route }) => {
  const [task, setTask] = useState('');
  const [isListening, setIsListening] = useState(false);

  const scheduleNotification = async (title, body, scheduledTime) => {
    // Schedule the notification using Firebase Cloud Messaging (FCM)
    await messaging().scheduleNotification({
      title,
      body,
      schedule: {
        fireDate: scheduledTime.toISOString(), // Convert the time to ISO string format
      },
    });
  };

  const handleAddTodo = () => {
    const collectionName = 'todos';
    const data = {
      title: task,
      completed: false,
    };

    // Add the document to the "todos" collection
    firebase.firestore()
      .collection(collectionName)
      .add(data)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        // Reset the task input after successful addition
        setTask('');
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };

  const handleSetTime = (selectedTime) => {
    // Your logic to handle the selected time
    // For example, you can format the selectedTime to display in a user-friendly format
    const formattedTime = format(selectedTime, "h:mm a");

    // Display a confirmation or use the formattedTime in your UI
    console.log("Selected time:", formattedTime);

    // Schedule the notification
    scheduleNotification('Reminder', 'It is time to do your task!', selectedTime);
  };


  const handleVoiceStart = async () => {
    setIsListening(true);
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      setIsListening(false);
    }
  };

  const handleVoiceEnd = async () => {
    setIsListening(false);
    try {
      await Voice.stop();
    } catch (error) {
      console.error(error);
    }
  };

  const handleVoiceResults = (e) => {
    if (e.value && e.value.length > 0) {
      setTask(e.value[0]);
    }
    setIsListening(false);
  };

  const addTask = () => {
    if (task.trim() !== '') {
      const addNewTask = route.params?.addNewTask;
      addNewTask(task); // Call the addNewTask function with the new task
      setTask('');
      navigation.goBack(); // Go back to the HomeScreen after adding the task
    }
  };

  useEffect(() => {
    Voice.onSpeechResults = handleVoiceResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a task..."
          value={task}
          onChangeText={(text) => setTask(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.voiceButton}
        onPressIn={handleVoiceStart}
        onPressOut={handleVoiceEnd}
      >
        <Icon name={isListening ? 'google-assistant' : 'microphone'} size={20} color="black" />
      </TouchableOpacity>

      {/* Include the SetDate component */}
      <SetDate />

      {/* Right tick symbol */}
      <View style={styles.rightTickContainer}>
        <TouchableOpacity onPress={addTask}>
          <Icon name="check-circle" size={60} color="blue" />
        </TouchableOpacity>
      </View>

      {/* Call handleSetTime when the user sets the time */}
      <SetDate onSetTime={handleSetTime} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  voiceButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  rightTickContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 30,
    width: 60,
    height: 60,
  },
});

export default NewPage;
