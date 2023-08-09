// Import necessary modules and components
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

// Your Firebase configuration (initialize Firebase) - Make sure to add this here or in App.js
// const firebaseConfig = { ... };

// Function to fetch todos from Firestore
const fetchTodosFromFirestore = async () => {
  const db = firebase.firestore();
  const collectionName = 'todos';

  try {
    const querySnapshot = await db.collection(collectionName).get();
    const todosData = [];
    querySnapshot.forEach((doc) => {
      todosData.push({ id: doc.id, ...doc.data() });
    });
    return todosData;
  } catch (error) {
    console.error('Error getting todos: ', error);
    return [];
  }
};

const HomeScreen = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch todos from Firestore on component mount
    fetchTodosFromFirestore()
      .then((todosData) => {
        setTodos(todosData);
      })
      .catch((error) => {
        console.error('Error getting todos: ', error);
      });
  }, []);

  // Function to handle task completion
  const handleTaskCompletion = async (taskId) => {
    const db = firebase.firestore();
    const collectionName = 'todos';

    try {
      // Update the "completed" field of the task with the given taskId
      await db.collection(collectionName).doc(taskId).update({
        completed: true,
      });

      // Fetch updated todos after completion and update the state
      const updatedTodos = await fetchTodosFromFirestore();
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error updating task: ', error);
    }
  };

  return (
    <View>
      {/* Display todos using FlatList or other components */}
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            {!item.completed && (
              <TouchableOpacity onPress={() => handleTaskCompletion(item.id)}>
                <Text>Mark as completed</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default HomeScreen;
