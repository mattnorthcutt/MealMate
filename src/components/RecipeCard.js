'use client';

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function RecipeCard({ recipe }) {
  return (
    <Card className="mb-4 shadow-sm">
      {recipe.image && <Card.Img variant="top" src={recipe.image} alt={recipe.title} />}
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>

        {/* Save to My Meals Button */}
        <Link
          href={{
            pathname: '/meals/new',
            query: {
              name: recipe.title,
              description: recipe.summary,
              img: recipe.image,
              ingredients: recipe.extendedIngredients ? recipe.extendedIngredients.map((ing) => ing.original).join(', ') : '',
            },
          }}
          passHref
        >
          <Button variant="primary" size="sm" className="mt-2">
            Save to My Meals
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    summary: PropTypes.string,
    extendedIngredients: PropTypes.arrayOf(
      PropTypes.shape({
        original: PropTypes.string,
      }),
    ),
  }).isRequired,
};
