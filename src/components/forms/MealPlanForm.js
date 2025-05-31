'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../utils/context/authContext';
import { createMealPlan, updateMealPlan } from '../../api/mealPlanData';

const initialState = {
  startDate: '',
  mealPlanName: '',
};

export default function MealPlanForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.firebaseKey) {
      updateMealPlan(formInput).then(() => router.push('/mealplans'));
    } else {
      const payload = {
        ...formInput,
        userId: user.uid,
        createdTime: new Date().toISOString(),
      };

      createMealPlan(payload).then((firebaseKey) => {
        const patchPayload = { ...payload, firebaseKey };
        updateMealPlan(patchPayload).then(() => {
          router.push('/mealplans');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Meal Plan</h2>

      <FloatingLabel controlId="floatingInput2" label="mealPlanName" className="mb-3">
        <Form.Control type="text" placeholder="Meal Plan Name" name="mealPlanName" value={formInput.mealPlanName} onChange={handleChange} />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput" label="Start Date of Meal Plan" className="mb-3">
        <Form.Control type="date" placeholder="Start Date" name="startDate" value={formInput.startDate} onChange={handleChange} required />
      </FloatingLabel>

      <Button type="submit" variant="primary">
        {obj.firebaseKey ? 'Update' : 'Create'} Meal Plan
      </Button>
    </Form>
  );
}

MealPlanForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    startDate: PropTypes.string,
  }),
};

MealPlanForm.defaultProps = {
  obj: initialState,
};
