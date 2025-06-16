'use client';

import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';
import { getMealDetailsById } from '@/api/mealSugData';

export default function RecipeCard({ recipe }) {
  const router = useRouter();

  const handleAddToMeals = () => {
    getMealDetailsById(recipe.id).then((details) => {
      const query = new URLSearchParams({
        name: details.title,
        img: details.image,
        description: details.summary?.replace(/<[^>]+>/g, '').slice(0, 150),
        ingredients: details.extendedIngredients?.map((ing) => ing.original).join(', '),
        mealPrefs: details.dishTypes?.join(', ') || '',
      }).toString();

      router.push(`/meals/new?${query}`);
    });
  };

  return (
    <Card className="shadow-sm border-0" style={{ borderRadius: '12px', background: '#fdfaf6' }}>
      <Card.Img variant="top" src={recipe.image} alt={recipe.title} style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px', height: '200px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Text style={{ fontSize: '0.9rem' }}>{(recipe.summary?.replace(/<[^>]+>/g, '') || '').slice(0, 120)}...</Card.Text>
        <Button variant="primary" size="sm" onClick={handleAddToMeals}>
          Add to My Meals
        </Button>
      </Card.Body>
    </Card>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    summary: PropTypes.string,
  }).isRequired,
};
