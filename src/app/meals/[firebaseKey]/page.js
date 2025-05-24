'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Spinner, Container, Card } from 'react-bootstrap';
import { getMealsByFirebaseKey } from '@/api/mealData';

export default function ViewMeal() {
  const { firebaseKey } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    getMealsByFirebaseKey(firebaseKey).then(setMeal);
  }, [firebaseKey]);

  if (!meal) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card
        className="text-center"
        style={{
          width: '40rem',
          height: '40rem',
        }}
      >
        {meal.img && <Card.Img variant="top" src={meal.img} alt={meal.name} />}
        <Card.Body>
          <Card.Title>{meal.name}</Card.Title>
          <Card.Text>{meal.description}</Card.Text>
          <Card.Text>
            <strong>Ingredients:</strong> {meal.ingredients}
          </Card.Text>
          <Card.Text>
            <strong>Preferences:</strong> {meal.mealPrefs}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
