// TaskInputWithVoice.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Voice from '@react-native-community/voice';

const TaskInputWithVoice = ({ setTasksList, tasksList }) => {
  const [task, setTask] = useState('');
  const [isListening, setIsListening] = useState(false);

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
      setTasksList([...tasksList, task]);
      setTask('');
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
        {task.trim() !== '' && (
          <TouchableOpacity style={styles.addIcon} onPress={addTask}>
            <Icon name="check" size={20} color="green" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={styles.voiceButton}
        onPressIn={handleVoiceStart}
        onPressOut={handleVoiceEnd}
      >
        <Icon name={isListening ? 'google-assistant' : 'microphone'} size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
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
  addIcon: {
    padding: 10,
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
};

export default TaskInputWithVoice;
