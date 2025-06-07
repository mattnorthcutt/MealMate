const endpoint = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

const getMealNutritionByMealName = (mealName) =>
  new Promise((resolve, reject) => {
    fetch(`https://api.spoonacular.com/recipes/guessNutrition?title=${mealName}&apiKey=${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export default getMealNutritionByMealName;
