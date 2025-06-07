'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Card, Button, Row, Col, Spinner } from 'react-bootstrap';
import { getMealsByFirebaseKey } from '@/api/mealData';
import getMealNutritionByMealName from '@/api/mealNutritionData';

export default function ViewMeal() {
  const { firebaseKey } = useParams();
  const [meal, setMeal] = useState(null);
  const [nutrData, setNutrData] = useState(null);

  useEffect(() => {
    getMealsByFirebaseKey(firebaseKey).then(setMeal);
  }, [firebaseKey]);

  useEffect(() => {
    if (meal?.name) {
      getMealNutritionByMealName(meal.name).then(setNutrData);
    }
  }, [meal]);

  if (!meal) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4 text-center">{meal.name}</h1>

      <Row className="align-items-start">
        <Col md={5} className="mb-4">
          {meal.img ? (
            <Card className="shadow">
              <Card.Img variant="top" src={meal.img} alt={meal.name} />
            </Card>
          ) : (
            <Card className="shadow">
              <Card.Body>
                <Card.Text>No Image Provided</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col md={7}>
          <Card className="mb-3 shadow">
            <Card.Body>
              <Card.Title>Description</Card.Title>
              <Card.Text>{meal.description || 'No description provided.'}</Card.Text>

              <Card.Title>Ingredients</Card.Title>
              <Card.Text>{meal.ingredients || 'No ingredients provided.'}</Card.Text>

              <Card.Title>Preferences / Tags</Card.Title>
              <Card.Text>{meal.mealPrefs || 'No preferences provided.'}</Card.Text>
            </Card.Body>
          </Card>

          {nutrData && (
            <Card className="shadow">
              <Card.Body>
                <Card.Title>Nutrition Info (per serving)</Card.Title>
                <Card.Text>
                  Calories: {nutrData.calories?.value} {nutrData.calories?.unit}
                </Card.Text>
                <Card.Text>
                  Protein: {nutrData.protein?.value} {nutrData.protein?.unit}
                </Card.Text>
                <Card.Text>
                  Fat: {nutrData.fat?.value} {nutrData.fat?.unit}
                </Card.Text>
                <Card.Text>
                  Carbs: {nutrData.carbs?.value} {nutrData.carbs?.unit}
                </Card.Text>

                <Button variant="outline-primary" className="mt-3" onClick={() => getMealNutritionByMealName(meal.name).then(setNutrData)}>
                  Refresh Nutrition Info
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}
