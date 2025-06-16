'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { createMeals, updateMeals } from '@/api/mealData';
import { useAuth } from '@/utils/context/authContext';
import { getMealPlansByUser } from '@/api/mealPlanData';

const initialState = {
  name: '',
  description: '',
  ingredients: '',
  mealPrefs: '',
  img: '',
  mealPlanId: '',
  mealType: '',
  day: '',
};

export default function MealForm() {
  const [formInput, setFormInput] = useState(initialState);
  const [mealPlans, setMealPlans] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Prefill from Spoonacular query params
  useEffect(() => {
    const prefill = {
      name: searchParams.get('name'),
      img: searchParams.get('img'),
      description: searchParams.get('description'),
      ingredients: searchParams.get('ingredients'),
      mealPrefs: searchParams.get('mealPrefs'),
    };

    const shouldPrefill = Object.values(prefill).some(Boolean);

    if (shouldPrefill) {
      setFormInput((prev) => ({ ...prev, ...prefill }));
    }
  }, [searchParams]);

  useEffect(() => {
    getMealPlansByUser(user.uid).then(setMealPlans);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formInput,
      creatorId: user.uid,
      createdTime: new Date().toISOString(),
    };

    createMeals(payload).then(({ name }) => {
      const patchPayload = { ...payload, firebaseKey: name };
      updateMeals(patchPayload).then(() => router.push('/'));
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">Create Meal</h2>

      <FloatingLabel controlId="floatingInput1" label="Meal Name" className="mb-3">
        <Form.Control type="text" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Description" className="mb-3">
        <Form.Control type="text" name="description" value={formInput.description} onChange={handleChange} />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Ingredients" className="mb-3">
        <Form.Control type="text" name="ingredients" value={formInput.ingredients} onChange={handleChange} />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="Meal Preferences" className="mb-3">
        <Form.Control type="text" name="mealPrefs" value={formInput.mealPrefs} onChange={handleChange} />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput5" label="Image URL" className="mb-3">
        <Form.Control type="url" name="img" value={formInput.img} onChange={handleChange} />
      </FloatingLabel>

      <Form.Group className="mb-3">
        <Form.Label>Meal Type</Form.Label>
        <Form.Select name="mealType" value={formInput.mealType} onChange={handleChange}>
          <option value="">Select a meal type</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snacks">Snacks</option>
          <option value="Extra">Extra</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Day of Week</Form.Label>
        <Form.Select name="day" value={formInput.day} onChange={handleChange}>
          <option value="">Select a day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </Form.Select>
      </Form.Group>

      <FloatingLabel controlId="floatingInput6" label="Assign to Meal Plan" className="mb-3">
        <Form.Select name="mealPlanId" value={formInput.mealPlanId} onChange={handleChange}>
          <option value="">-- Select a Meal Plan --</option>
          {mealPlans.map((plan) => (
            <option key={plan.firebaseKey} value={plan.firebaseKey}>
              {plan.mealPlanName}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <Button type="submit" variant="primary">
        Create Meal
      </Button>
    </Form>
  );
}
