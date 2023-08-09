// app.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Platform, TouchableOpacity, FlatList } from 'react-native';
import MenuButton from './components/MenuButton';
import DropdownButton from './components/DropdownButton';
import NewPage from './components/NewPage';
import TaskInputWithVoice from './components/TaskInputWithVoice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SetDate from './components/SetDate';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAc8-a9NpVwG9FtQ4vrVGruTtxIuBiopwA",
  authDomain: "todolistapp-dc74a.firebaseapp.com",
  projectId: "todolistapp-dc74a",
  storageBucket: "todolistapp-dc74a.appspot.com",
  messagingSenderId: "922610825053",
  appId: "1:922610825053:android:c62c7b3abd7bf3e0f81ab4",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

const HomeScreen = ({ route, navigation }) => {
  const options = route.params?.options || [];
  const [tasksList, setTasksList] = useState([]);

  const handleOptionSelect = (option) => {
    console.log('Selected Option:', option);
    // Replace this with the appropriate logic to handle the selected option
  };

  const addNewTask = (newTask) => {
    if (newTask.trim() !== '') {
      setTasksList([...tasksList, newTask]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <DropdownButton options={options} onSelect={handleOptionSelect} />
        <MenuButton />
      </View>

      {/* Display tasks at the top */}
      <FlatList
        data={tasksList}
        renderItem={({ item, index }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => setTasksList(tasksList.filter((_, i) => i !== index))}>
              <Icon name="checkbox-marked-outline" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.taskText}>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <View style={styles.homeScreen}>
            <Text style={styles.homeScreenText}>Nothing to do</Text>
          </View>
        )}
        contentContainerStyle={{ flexGrow: 1 }}
      />

      <View style={styles.taskInputContainer}>
        {/* + icon to navigate to a new page */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('NewPage', { addNewTask })}
        >
          <Icon name="plus" size={24} color="white" />
        </TouchableOpacity>
        {/* Task Input With Voice Component */}
        <View style={styles.taskInputWithVoiceContainer}>
          <TaskInputWithVoice setTasksList={setTasksList} tasksList={tasksList} />
        </View>
      </View>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  const options = ['All Lists', 'Default', 'Finished', 'New List'];

  useEffect(() => {
    // Listen for incoming notifications when the app is in the foreground
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // Handle the incoming notification
      console.log('Received a notification:', remoteMessage.notification);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} initialParams={{ options }} />
          <Stack.Screen name="NewPage" component={NewPage} options={{ title: 'New Page' }} />
          <Stack.Screen name="SetDate" component={SetDate} options={{ title: 'Set Date' }} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  navbar: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 20,
    backgroundColor: '#4682B4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  homeScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeScreenText: {
    fontSize: 24,
  },
  taskInputContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 10,
    justifyContent: 'flex-end',
  },
  addButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    backgroundColor: 'blue',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  taskText: {
    marginLeft: 10,
    fontSize: 16,
  },
  taskInputWithVoiceContainer: {
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default App;
