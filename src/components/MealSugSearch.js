'use client';

import { useState } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { getMealSuggestionsByName } from '../api/mealSugData';
import RecipeCard from './RecipeCard';

export default function MealSuggestionSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    getMealSuggestionsByName(searchTerm).then((res) => {
      setRecipes(res);
      setLoading(false);
    });
  };

  return (
    <>
      <h2 className="mb-4">Search for Suggested Meals</h2>
      <Form onSubmit={handleSubmit} className="d-flex mb-4">
        <Form.Control type="text" placeholder="Search recipes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="me-2" />
        <Button type="submit" variant="primary">
          Search
        </Button>
      </Form>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {recipes.map((recipe) => (
            <Col key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
