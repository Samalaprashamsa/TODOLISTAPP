// firestoreUtils.js

import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase config object here
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

const addTodo = (todoData) => {
  const collectionName = 'todos';

  return db.collection(collectionName).add(todoData);
};

const updateTodo = (todoId, updatedData) => {
  const collectionName = 'todos';

  return db.collection(collectionName).doc(todoId).update(updatedData);
};

const getAllTodos = () => {
  const collectionName = 'todos';

  return db.collection(collectionName).get();
};

export { addTodo, updateTodo, getAllTodos };
