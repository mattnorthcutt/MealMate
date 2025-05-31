'use client';

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getMealsByUser } from '../api/mealData';
import { useAuth } from '../utils/context/authContext';
import MealCard from '../components/MealCard';

export default function Home() {
  const [meals, setMeals] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.uid) {
      getMealsByUser(user.uid).then(setMeals);
    }
  }, [user]);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Welcome to MealMate, {user?.displayName || 'friend'}</h1>

      {meals.length > 0 ? (
        <Row xs={1} sm={2} md={3} className="g-4">
          {meals.map((meal) => (
            <Col key={meal.firebaseKey}>
              <MealCard meal={meal} onUpdate={() => getMealsByUser(user.uid).then(setMeals)} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center">
          <p>You have no added meals yet.</p>
          <Button variant="primary" href="/meals/new">
            + Add Your First Meal
          </Button>
        </div>
      )}
    </Container>
  );
}
