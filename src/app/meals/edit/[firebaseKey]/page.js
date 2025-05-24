'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getSingleMeal } from '@/api/mealData';
import MealForm from '@/components/forms/MealForm';

export default function EditMeal({ params }) {
  const [editMeal, setEditMeal] = useState({});
  const { firebaseKey } = params;

  useEffect(() => {
    getSingleMeal(firebaseKey).then(setEditMeal);
  }, [firebaseKey]);

  return <MealForm obj={editMeal} />;
}

EditMeal.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
