import { Box } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import './recipe.css'
import { config } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { changeRecipe } from "../features/recipeSlice";
const Recipe = () => {
  let { recipeId } = useParams();
  const dispatch = useDispatch();
  const { recipe } = useSelector((state) => state.recipe);
  const performApiCall = async () => {
    let response = {};
    let errored = false;
    try {
      response = await (
        await fetch(`${config.endpoint}/recipe/${recipeId}`, {
          method: "GET",
        })
      ).json();
    } catch (e) {
      errored = true;
      return errored;
    }

    dispatch(changeRecipe(response));
    return recipe;
  };


  useEffect(() => {

    performApiCall();
  }, []);

  return (
    <Box>

      {typeof recipe !== "undefined" && (
        <Box>
          <Box className="recipe-title-in-detail">
            {recipe.title}
          </Box>
          <div style={{display:'flex',justifyContent:'space-evenly'}}>
           <h3>Meal-type:- {recipe.mealType}</h3> 
           <h3>Preparation time:- {recipe.prepTime}</h3>
           <h3>Servings:- {recipe.servings}</h3>
          </div>
          <div style={{position:'relative'}}>
          <span className="paper-clip"></span>
          <div className="container" >
          
            <Box className="list">
              <ul>
                <div style={{ textAlign: "center", padding: "10px", fontWeight: "bold", fontSize: "25px" }}>Ingredients </div>

                {recipe.ingredients.map((ele, index) => (

                  <li className="ingridents-list" key={index}>{ele}</li>
                ))}
              </ul>
            </Box>
          </div>
          </div>
          <div style={{position:'relative'}}>
          <span className="paper-clip"></span>
          <div className="container">
         
            <Box className="list">

              <ul>
                <div style={{ textAlign: "center", padding: "10px", fontWeight: "bold", fontSize: "25px" }}>Steps </div>

                {recipe.steps.map((ele, index) => (

                  <li className="ingridents-list" key={index}>{ele}</li>
                ))}
              </ul>
            </Box>
          </div>
          </div>
        </Box>
      )}


    </Box>
  )
}
export default Recipe