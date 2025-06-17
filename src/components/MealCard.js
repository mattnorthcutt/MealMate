'use client';

import PropTypes from 'prop-types';
import { Card, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import { deleteMeals } from '../api/mealData';

export default function MealCard({ meal, onUpdate }) {
  const deleteThisMeal = () => {
    if (window.confirm(`Delete ${meal.name}?`)) {
      deleteMeals(meal.firebaseKey).then(onUpdate);
    }
  };

  return (
    <Card className="mealmate-card shadow-sm border-0">
      {meal.img && <Card.Img variant="top" src={meal.img} alt={meal.name} style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px', height: '200px', objectFit: 'cover' }} />}

      <Card.Body style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Card.Title className="d-flex justify-content-between align-items-start">
          <span>{meal.name}</span>

          <Dropdown>
            <Dropdown.Toggle variant="light" size="sm" id="dropdown-basic">
              ⋮
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} href={`/meals/view/${meal.firebaseKey}`}>
                View
              </Dropdown.Item>
              <Dropdown.Item as={Link} href={`/meals/edit/${meal.firebaseKey}`}>
                Edit
              </Dropdown.Item>
              <Dropdown.Item onClick={deleteThisMeal} className="text-danger">
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Title>

        <Card.Text className="text-muted text-truncate mb-1" style={{ maxHeight: '60px', minHeight: '60px' }}>
          {meal.description || 'No description added yet.'}
        </Card.Text>

        <Card.Text style={{ fontSize: '0.9rem' }}>
          <strong>Tags:</strong> {meal.mealPrefs || 'None'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

MealCard.propTypes = {
  meal: PropTypes.shape({
    img: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    mealPrefs: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
