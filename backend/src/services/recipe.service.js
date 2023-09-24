const { Recipe } = require("../models");

const getRecipe = async () => {
  const getRecipe = await Recipe.find({});
  return getRecipe
};

const getRecipeById = async (id) => {
  return await Recipe.findById(id)
}

const postRecipe = async (body) => {
  const recipe = await Recipe.create(body)
  return recipe
}

const postFilter = async (data) => {
  const getRecipe = await Recipe.find({});
  if (data.duration && data.meal) {
    const filteredData = getRecipe.filter((item) => {
      return item.prepTime.split(' ')[0] >= Math.min(data.duration.split('-')[0]) && item.prepTime.split(' ')[0] <= Math.max(data.duration.split('-')[1]) && item.mealType.toLowerCase().includes(data.meal.toLowerCase())
    })
    return filteredData
  }

  if (data.meal && !data.duration) {
    const filteredData = getRecipe.filter((item) => {
      return item.mealType.toLowerCase().includes(data.meal.toLowerCase())
    });
    return filteredData
  }
  if (data.duration && !data.meal) {

    const filteredData = getRecipe.filter((item) => {
      return item.prepTime.split(' ')[0] >= Math.min(data.duration.split('-')[0]) && item.prepTime.split(' ')[0] <= Math.max(data.duration.split('-')[1])
    });
    return filteredData
  }
  if (data.title) {
    const filteredData = getRecipe.filter((item) => {
      return item.title.toLowerCase().includes(data.title.toLowerCase())
    });
    return filteredData
  }
  if (data.title === '') {
    return getRecipe
  }
}
module.exports = { getRecipe, getRecipeById, postFilter, postRecipe }