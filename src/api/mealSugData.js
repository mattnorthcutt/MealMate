const endpoint = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

const getMealSuggestionsByName = (mealName) =>
  new Promise((resolve, reject) => {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${mealName}&number=5&addRecipeInformation=true&apiKey=${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data.results))
      .catch(reject);
  });

export default getMealSuggestionsByName;
