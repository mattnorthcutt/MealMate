import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getMealPlansByUser = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/mealPlans.json?orderBy="userId"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const createMealPlan = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/mealPlans.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => resolve(data.name))
      .catch(reject);
  });

const updateMealPlan = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/mealPlans/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });

const deleteMealPlan = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/mealPlans/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });

export { getMealPlansByUser, createMealPlan, updateMealPlan, deleteMealPlan };
