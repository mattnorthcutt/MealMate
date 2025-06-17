'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import { deleteMealPlan } from '@/api/mealPlanData';

export default function MealPlanCard({ plan, onUpdate }) {
  const deleteThisPlan = () => {
    if (window.confirm(`Delete "${plan.mealPlanName}"?`)) {
      deleteMealPlan(plan.firebaseKey).then(onUpdate);
    }
  };

  return (
    <Card className="mealmate-card shadow-sm border-0">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-start">
          <span>{plan.mealPlanName || 'Untitled Plan'}</span>

          <Dropdown>
            <Dropdown.Toggle variant="light" size="sm" id="dropdown-basic">
              ⋮
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} href={`/mealplans/view/${plan.firebaseKey}`}>
                View
              </Dropdown.Item>
              <Dropdown.Item as={Link} href={`/mealplans/edit/${plan.firebaseKey}`}>
                Edit
              </Dropdown.Item>
              <Dropdown.Item onClick={deleteThisPlan} className="text-danger">
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Title>

        <Card.Text className="text-muted mb-1">
          <strong>Start Date:</strong> {plan.startDate ? new Date(plan.startDate).toLocaleDateString() : 'N/A'}
        </Card.Text>

        <Card.Text style={{ fontSize: '0.9rem' }}>
          <strong>Created:</strong> {plan.createdTime ? new Date(plan.createdTime).toLocaleDateString() : 'N/A'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

MealPlanCard.propTypes = {
  plan: PropTypes.shape({
    mealPlanName: PropTypes.string,
    startDate: PropTypes.string,
    createdTime: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
