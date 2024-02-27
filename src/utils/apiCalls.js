const handleError = (response) => {
  if (!response.ok) {
    throw new Error(`Error ${response.status}: Please try again!`);
  }

  return response.json();
};

export const getItem = async (itemName) => {
  console.log('app id', process.env.REACT_APP_ID);
  console.log('app key', process.env.REACT_APP_KEY);
  try {
    const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}&ingr=${itemName}&nutrition-type=cooking`);
    const data = await handleError(response);
    return data;
  } catch (error) {
    throw error;
  }
};
