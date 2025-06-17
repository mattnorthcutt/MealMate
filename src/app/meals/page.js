'use client';

import { useEffect, useState } from 'react';
import { getMealsByUser } from '@/api/mealData';
import { useAuth } from '@/utils/context/authContext';
import MealCard from '@/components/MealCard';
import { Container, Row, Col, Card } from 'react-bootstrap';
import MealSuggestionSearch from '../../components/MealSugSearch';

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
      <Card className="mb-5 shadow-lg border-0 bg-light">
        <Card.Body>
          <Card.Title className="fw-bold text-dark mb-4 fs-3"> Meal Suggestions</Card.Title>
          <MealSuggestionSearch />
        </Card.Body>
      </Card>

      <h1 className="mb-4 text-center fw-bold">Your Meals</h1>
      <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '12px' }}>
        <Row className="g-4">
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
      </div>
    </Container>
  );
}
