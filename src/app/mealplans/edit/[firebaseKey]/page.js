'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSingleMealPlan } from '@/api/mealPlanData';
import MealPlanForm from '@/components/forms/MealPlanForm';

export default function EditMealPlanPage() {
  const { firebaseKey } = useParams();
  const [mealPlan, setMealPlan] = useState(null);

  useEffect(() => {
    getSingleMealPlan(firebaseKey).then(setMealPlan);
  }, [firebaseKey]);

  return mealPlan ? <MealPlanForm obj={mealPlan} /> : <p>Loading...</p>;
}
