'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSingleMealPlan } from '@/api/mealPlanData';
import { getMealsByMealPlanId } from '@/api/mealData';
import MealCard from '@/components/MealCard';
import { Container, Col } from 'react-bootstrap';

export default function ViewMealPlanPage() {
  const { firebaseKey } = useParams();
  const [mealPlan, setMealPlan] = useState({});
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getSingleMealPlan(firebaseKey).then(setMealPlan);
    getMealsByMealPlanId(firebaseKey).then(setMeals);
  }, [firebaseKey]);

  return (
    <Container className="py-5">
      {mealPlan?.mealPlanName ? (
        <>
          <h1 className="mb-4">
            {mealPlan.mealPlanName} - Week of {mealPlan.startDate}
          </h1>

          {meals.map((meal) => (
            <Col key={meal.firebaseKey} xs={12} sm={6} md={4} lg={3}>
              <MealCard meal={meal} onUpdate={() => getMealsByMealPlanId(firebaseKey).then(setMeals)} />
            </Col>
          ))}
        </>
      ) : (
        <p>Loading Meal Plan...</p>
      )}
    </Container>
  );
}
