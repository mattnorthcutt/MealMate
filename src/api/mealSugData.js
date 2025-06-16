const endpoint = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

const getMealSuggestionsByName = (mealName) =>
  new Promise((resolve, reject) => {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${mealName}&number=5&addRecipeInformation=true&apiKey=${endpoint}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => resolve(data.results)) // <- keep original shape
      .catch(reject);
  });

const getMealDetailsById = (id) =>
  new Promise((resolve, reject) => {
    fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${endpoint}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });

export { getMealSuggestionsByName, getMealDetailsById };
