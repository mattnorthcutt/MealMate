'use client';

import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import getMealSuggestionsByName from '../api/mealSugData';

export default function MealSuggestionSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      getMealSuggestionsByName(searchTerm).then(setSuggestions);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Find Suggested Meals</h2>
      <Form onSubmit={handleSubmit} className="mb-4 d-flex justify-content-center">
        <Form.Control type="text" placeholder="Type a meal name (e.g. chicken alfredo)" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="me-2 w-50" />
        <Button type="submit" variant="primary">
          Search
        </Button>
      </Form>

      <Row>
        {suggestions.map((recipe) => (
          <Col key={recipe.id} md={4} className="mb-4">
            <Card>
              {recipe.image && <Card.Img variant="top" src={recipe.image} alt={recipe.title} />}
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>
                  <strong>Ready in:</strong> {recipe.readyInMinutes} minutes
                  <br />
                  <strong>Servings:</strong> {recipe.servings}
                </Card.Text>
                <a href={`https://spoonacular.com/recipes/${recipe.title.replace(/ /g, '-')}-${recipe.id}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
                  View Full Recipe
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
