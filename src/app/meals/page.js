'use client';

import { useEffect, useState } from 'react';
import { getMealsByUser } from '@/api/mealData';
import { useAuth } from '@/utils/context/authContext';
import MealCard from '@/components/MealCard';
import { Container, Row, Col } from 'react-bootstrap';

export default function MealsPage() {
  const { user } = useAuth();
  const [meals, setMeals] = useState([]);

  const fetchMeals = () => {
    getMealsByUser(user.uid).then(setMeals);
  };

  useEffect(() => {
    if (user?.uid) fetchMeals();
  }, [user]);

  return (
    <Container className="py-5">
      <h1 className="mb-4">Your Meals</h1>

      <Row>
        {meals.length ? (
          meals.map((meal) => (
            <Col key={meal.firebaseKey} xs={12} sm={6} md={4} lg={3}>
              <MealCard meal={meal} onUpdate={fetchMeals} />
            </Col>
          ))
        ) : (
          <p className="text-muted">No meals yet. Create one!</p>
        )}
      </Row>
    </Container>
  );
}
