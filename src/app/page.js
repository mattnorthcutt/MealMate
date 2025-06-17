'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { getMealsByUser } from '@/api/mealData';
import { getMealPlansByUser } from '@/api/mealPlanData';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import MealCard from '@/components/MealCard';
import MealPlanCard from '@/components/MealPlanCard';
import MealSuggestionSearch from '@/components/MealSugSearch';
import Link from 'next/link';

export default function Home() {
  const { user } = useAuth();
  const [meals, setMeals] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);

  const getMeals = () => {
    getMealsByUser(user.uid).then(setMeals);
  };

  const getMealPlans = () => {
    getMealPlansByUser(user.uid).then(setMealPlans);
  };

  useEffect(() => {
    getMeals();
    getMealPlans();
  }, [user]);

  return (
    <Container className="py-5">
      <div
        className="p-5 mb-5 text-white text-center rounded"
        style={{
          background: 'linear-gradient(90deg, rgb(191, 86, 0) 0%, rgb(83, 8, 5) 100%)',
          boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
        }}
      >
        <h1 className="fw-bold display-4 mt-">Welcome to MealMate </h1>
        <p className="lead mb-0">Plan your meals. Track nutrition. Stay organized.</p>
      </div>

      <div className="d-flex justify-content-center gap-4 mb-5 flex-wrap">
        <Link href="/meals/new" passHref>
          <Button variant="success" size="lg" className="px-4 py-2 fw-bold shadow-sm">
            + Add New Meal
          </Button>
        </Link>
        <Link href="/mealplans" passHref>
          <Button variant="info" size="lg" className="px-4 py-2 fw-bold shadow-sm">
            View Meal Plans
          </Button>
        </Link>
      </div>

      <div className="meal-card-container">
        <Card className="mealmate-card mb-5 shadow-lg border-0">
          <Card.Body>
            <Card.Title className="fw-bold text-dark mb-4 fs-3"> My Meal Plans</Card.Title>
            {mealPlans.length ? (
              <Row xs={1} md={2} lg={3} className="g-4">
                {mealPlans.map((plan) => (
                  <Col key={plan.firebaseKey}>
                    <MealPlanCard plan={plan} onUpdate={getMealPlans} />
                  </Col>
                ))}
              </Row>
            ) : (
              <p className="text-muted">No meal plans yet. Head to Meal Plans to create one!</p>
            )}
          </Card.Body>
        </Card>
      </div>

      <div className="meal-card-container">
        <Card className="mealmate-card mb-5 shadow-lg border-0 bg-light">
          <Card.Body>
            <Card.Title className="fw-bold text-dark mb-4 fs-3"> Meal Suggestions</Card.Title>
            <MealSuggestionSearch />
          </Card.Body>
        </Card>
      </div>

      <div className="meal-card-container">
        <Card className="shadow-sm border-0 mealmate-card">
          <Card.Body>
            <Card.Title className="fw-bold text-dark mb-4 fs-3"> My Meals</Card.Title>
            {meals.length ? (
              <Row xs={1} md={2} lg={3} className="g-4">
                {meals.map((meal) => (
                  <Col key={meal.firebaseKey}>
                    <MealCard meal={meal} onUpdate={getMeals} />
                  </Col>
                ))}
              </Row>
            ) : (
              <p className="text-muted">No meals added yet. Add a meal to get started!</p>
            )}
          </Card.Body>
        </Card>
      </div>

      <p className="text-center text-muted mt-5">MealMate © 2025 — Stay Healthy, Stay Organized </p>
    </Container>
  );
}
