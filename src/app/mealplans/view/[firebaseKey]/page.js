'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSingleMealPlan } from '@/api/mealPlanData';
import { getMealsByMealPlanId } from '@/api/mealData';
import { Container, Table, Spinner } from 'react-bootstrap';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Extra'];

export default function ViewMealPlanPage() {
  const { firebaseKey } = useParams();
  const [mealPlan, setMealPlan] = useState({});
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getSingleMealPlan(firebaseKey).then(setMealPlan);
    getMealsByMealPlanId(firebaseKey).then(setMeals);
  }, [firebaseKey]);

  if (!mealPlan?.mealPlanName) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">
        {mealPlan.mealPlanName} - Week of {mealPlan.startDate}
      </h1>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Day</th>
            {mealTypes.map((type) => (
              <th key={type}>{type}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day) => (
            <tr key={day}>
              <td>{day}</td>
              {mealTypes.map((type) => {
                const meal = meals.find((m) => m.day === day && m.mealType === type);
                return (
                  <td key={`${day}-${type}`}>
                    {meal ? (
                      <>
                        <strong>{meal.name}</strong>
                        <div className="text-muted small">{meal.description}</div>
                      </>
                    ) : (
                      <span className="text-muted">No meal</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
