'use client';

import React, { useEffect, useState } from 'react';
import { getMealPlansByUser } from '@/api/mealPlanData';
import { useAuth } from '@/utils/context/authContext';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import MealPlanCard from '../../components/MealPlanCard';

export default function MealPlansPage() {
  const { user } = useAuth();
  const [mealPlans, setMealPlans] = useState([]);

  const fetchMealPlans = () => {
    getMealPlansByUser(user.uid).then(setMealPlans);
  };

  useEffect(() => {
    fetchMealPlans();
  }, [user]);

  return (
    <Container className="py-5">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="fw-bold">Your Meal Plans</h1>
        </Col>
        {/* For Stretch */}
        <Col className="text-end">
          <Link href="/mealplans/new" passHref>
            <Button variant="success" className="rounded-pill px-4">
              + New Meal Plan
            </Button>
          </Link>
        </Col>
      </Row>

      {mealPlans.length ? mealPlans.map((plan) => <MealPlanCard key={plan.firebaseKey} plan={plan} onUpdate={fetchMealPlans} />) : <p className="text-muted">No meal plans yet. Assign a meal to a plan using the Meal Form!</p>}
    </Container>
  );
}
