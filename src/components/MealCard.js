'use client';

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteMeals } from '../api/mealData';

function MealCard({ meal, onUpdate }) {
  const deleteThisMeal = () => {
    if (window.confirm(`Delete ${meal.name}?`)) {
      deleteMeals(meal.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div>
      <Card>
        {meal.img && <Card.Img variant="top" src={meal.img} alt={meal.name} />}
        <Card.Body>
          <Card.Title>{meal.name}</Card.Title>
          <Card.Text>{meal.description || 'No description added yet.'}</Card.Text>
          <Button href={`/meals/edit/${meal.firebaseKey}`} variant="outline-primary">
            Edit Meal
          </Button>
          <Button href={`/meals/${meal.firebaseKey}`} variant="primary" className="m-2">
            VIEW
          </Button>
          <Button variant="danger" onClick={deleteThisMeal} className="m-2">
            DELETE
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

MealCard.propTypes = {
  meal: PropTypes.shape({
    img: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MealCard;
