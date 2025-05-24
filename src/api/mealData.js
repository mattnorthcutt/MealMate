import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getMealsByUser = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/meals.json?orderBy="creatorId"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const getMealsByFirebaseKey = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/meals/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const getSingleMeal = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/meals/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deleteMeals = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/meals/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const createMeals = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/meals.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data.name))
      .catch(reject);
  });

const updateMeals = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/meals/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { createMeals, updateMeals, getMealsByUser, deleteMeals, getSingleMeal, getMealsByFirebaseKey };
