'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { deleteMealPlan } from '../api/mealPlanData';

export default function MealPlanCard({ plan, onUpdate }) {
  const handleDelete = () => {
    if (window.confirm(`Delete Meal Plan for ${plan.startDate}?`)) {
      deleteMealPlan(plan.firebaseKey).then(onUpdate);
    }
  };

  return (
    <Card className="shadow-sm mb-4 border-0">
      <Card.Body>
        <Row className="align-items-center">
          <Col md={8}>
            <h5 className="mb-1">Week of {plan.mealPlanName}</h5>
            <small className="text-muted">Created: {new Date(plan.createdTime).toLocaleDateString()}</small>
          </Col>
          <Col md={4} className="text-end">
            <Link href={`/mealplans/view/${plan.firebaseKey}`} passHref>
              <Button variant="primary" className="me-2">
                View
              </Button>
            </Link>
            <Link href={`/mealplans/edit/${plan.firebaseKey}`} passHref>
              <Button variant="secondary" className="me-2">
                Edit
              </Button>
            </Link>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

MealPlanCard.propTypes = {
  plan: PropTypes.shape({
    firebaseKey: PropTypes.string,
    startDate: PropTypes.string,
    mealPlanName: PropTypes.string,
    createdTime: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
