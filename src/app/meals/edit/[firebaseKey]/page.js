'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getSingleMeal } from '@/api/mealData';
import MealForm from '@/components/forms/MealForm';

export default function EditMeal({ params }) {
  const [editMeal, setEditMeal] = useState(null);
  const { firebaseKey } = params;

  useEffect(() => {
    getSingleMeal(firebaseKey).then((data) => {
      if (data && data.firebaseKey) {
        setEditMeal(data);
      }
    });
  }, [firebaseKey]);

  if (!editMeal) return <p className="text-center text-white mt-5">Loading meal data...</p>;

  return <MealForm obj={editMeal} />;
}

EditMeal.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
