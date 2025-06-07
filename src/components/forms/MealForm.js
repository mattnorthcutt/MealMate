'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
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

function MealForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const [mealPlans, setMealPlans] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  useEffect(() => {
    getMealPlansByUser(user.uid).then(setMealPlans);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.firebaseKey) {
      updateMeals(formInput).then(() => router.push('/'));
    } else {
      const payload = {
        ...formInput,
        creatorId: user.uid,
        createdTime: new Date().toISOString(),
      };

      createMeals(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateMeals(patchPayload).then(() => router.push('/'));
      });
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className="text-black">
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Meal</h2>

        {/* MEAL NAME */}
        <FloatingLabel controlId="floatingInput1" label="Meal Name" className="mb-3">
          <Form.Control type="text" placeholder="Meal Name" name="name" value={formInput.name} onChange={handleChange} required />
        </FloatingLabel>

        {/* DESCRIPTION */}
        <FloatingLabel controlId="floatingInput2" label="Description" className="mb-3">
          <Form.Control type="text" placeholder="Short Description" name="description" value={formInput.description} onChange={handleChange} />
        </FloatingLabel>

        {/* INGREDIENTS */}
        <FloatingLabel controlId="floatingInput3" label="Ingredients (comma-separated)" className="mb-3">
          <Form.Control type="text" placeholder="e.g. eggs, spinach, feta" name="ingredients" value={formInput.ingredients} onChange={handleChange} />
        </FloatingLabel>

        {/* PREFERENCES */}
        <FloatingLabel controlId="floatingInput4" label="Meal Preferences / Tags" className="mb-3">
          <Form.Control type="text" placeholder="e.g. vegetarian, high-protein" name="mealPrefs" value={formInput.mealPrefs} onChange={handleChange} />
        </FloatingLabel>

        {/* IMAGE */}
        <FloatingLabel controlId="floatingInput5" label="Image URL" className="mb-3">
          <Form.Control type="url" placeholder="Meal Image URL" name="img" value={formInput.img} onChange={handleChange} />
        </FloatingLabel>

        {/* MEAL TYPE */}
        <Form.Group className="mb-3">
          <Form.Label>Meal Type</Form.Label>
          <Form.Select name="mealType" value={formInput.mealType} onChange={handleChange} required>
            <option value="">Select a meal type</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snacks">Snacks</option>
            <option value="Extra">Extra</option>
          </Form.Select>
        </Form.Group>

        {/* DAY OF WEEK */}
        <Form.Group className="mb-3">
          <Form.Label>Day of Week</Form.Label>
          <Form.Select name="day" value={formInput.day} onChange={handleChange} required>
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

        {/* ASSIGN TO MEAL PLAN */}
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

        {/* SUBMIT */}
        <Button type="submit" variant="primary">
          {obj.firebaseKey ? 'Update' : 'Create'} Meal
        </Button>
      </Form>
    </div>
  );
}

MealForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    ingredients: PropTypes.string,
    mealPrefs: PropTypes.string,
    img: PropTypes.string,
    mealPlanId: PropTypes.string,
    mealType: PropTypes.string,
    day: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MealForm.defaultProps = {
  obj: initialState,
};

export default MealForm;
