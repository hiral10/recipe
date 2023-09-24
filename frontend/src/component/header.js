import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Stack, TextField } from "@mui/material"
import './header.css'
import Select from "react-select";
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../features/recipeSlice";
import { config } from "../App";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { changeDurationOption, changeOption, getTitle } from "../features/filterSlice";
import axios from "axios";
const Header = () => {
  let data = {
    title: "",
    ingredients: [],
    steps: [],
    calories: "",
    prepTime: "",
    image:"",
    mealType: "",
    servings: "",
  };
  const { meal } = useSelector((state) => state.filter);
  const { duration } = useSelector((state) => state.filter)
  const { recipes } = useSelector((state) => state.recipe);
  const [searchKey, setSearchKey] = useState("");
  const [value, setValue] = useState(data);
  const [open, setOpen] = useState(false);
  // const [image, setImage] = useState("")
  const [name, setName] = useState('');
  const [stepsfield, setStepsField] = useState('')
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [uploadmeal,setuploadmeal] = useState()
  const [changeIngredientClass, setIngredientClass] = useState(false)
  const [changeStepsClass, setStepsClass] = useState(false)
  const [isIngredientValid, setisIngredientvalid] = useState(false)
  const [isStepValid, setisStepvalid] = useState(false)
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [isCaloriesvalid, setIscaloriesValid] = useState(false)
  const [isPreptimeValid, setIsPreptimeValid] = useState(false);
  const [isServingValid, setIsServingValid] = useState(false);
  const [isMealTypeValid,setIsMealtypeValid] = useState(false)
  const [isImageValid,setIsImageValid] = useState(false)
  const [image,setImage] = useState({image:''})
  const [uploaddisable,setUploaddisable] = useState(false)
  const [resetform,setresetform] = useState(false)
  const dispatch = useDispatch();

  let options = [{ value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" }]
  
  let optionsDuration = [
    { value: "0-30", label: "Within 30 min" },
    { value: "0-60", label: "Within 1 Hour" },

  ]
  const getRecipe = async () => {
    let response = {};
    let errored = false;

    try {
      response = await (
        await fetch(`${config.endpoint}/recipe`, {
          method: "GET",
        })
      ).json();
    } catch (e) {
      errored = true;
      return errored;
    }

    dispatch(getRecipes(response))
    return recipes
  };


  const handleClear = async () => {
    dispatch(changeOption([]))
    if (typeof duration !== 'undefined') {

      if (duration.length !== 0) {
        performDurationFilter(duration)
      }
      if (duration.length == 0) {
        return await getRecipe()
      }
    }
  };

  const handleClearDuration = async () => {
    dispatch(changeDurationOption([]))
    if (typeof meal !== 'undefined') {

      if (meal.length !== 0) {
        performMealFilter(meal)
      }
      if (meal.length == 0) {
        return await getRecipe()
      }
    }
  };

  const performMealFilter = async (e, text) => {

    dispatch(changeOption(e))
    let response = {};
    let errored = false;

    try {
      response = await (
        await fetch(`${config.endpoint}/recipe?meal=${e.value}`, {
          method: "POST",
        })
      ).json();
    } catch (e) {
      errored = true;
      return errored;
    }
    dispatch(getRecipes(response));
  };

  const performDurationFilter = async (e, text) => {
    dispatch(changeDurationOption(e))
    let response = {};
    let errored = false;

    if (meal.length === 0) {
      try {
        response = await (
          await fetch(`${config.endpoint}/recipe?duration=${e.value}`, {
            method: "POST",
          })
        ).json();
      } catch (e) {
        errored = true;
        return errored;
      }
      dispatch(getRecipes(response));
    }
    else {
      performSorting()
    }
  };

  const performSorting = async () => {

    let response = {};
    let errored = false;

    try {
      response = await (
        await fetch(`${config.endpoint}/recipe?meal=${meal.value}&duration=${duration.value}`, {
          method: "POST",
        })
      ).json();
    } catch (e) {
      errored = true;
      return errored;
    }

    dispatch(getRecipes(response));

  };

  useEffect(() => {
    if (meal.length !== 0 && duration.length !== 0) {
      performSorting()
    }
  }, [meal, duration,value])

  const performSearch = async (text) => {
    let value = [];
    let errored = false;
    let response = {};
    setSearchKey(text);

    try {
      response = await (
        await fetch(`${config.endpoint}/recipe?title=${text}`, {
          method: "POST",
        })
      ).json();
      dispatch(getRecipes(response));
      return recipes
    } catch (error) {
      errored = true;
      return errored;
    }
  };

  const debounceSearch = (event, debounceTimeout) => {
    let targetvalue = event.target.value;

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(() => performSearch(targetvalue), 500);
  };

  const search = (e) => {
    dispatch(getTitle(e.target.value));
    debounceSearch(e);
  };

  const handleClickOpen = () => {
    setOpen(true);
    if (value.ingredients.length === 0) {
      setIngredientClass(false)
    }
    else {
      setIngredientClass(true)
    }

    if (value.steps.length === 0) {
      setStepsClass(false)
    }
    else {
      setStepsClass(true)
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    
  };
  const add = () => {
    if (name) {
      setIngredients(ingredients, ingredients.push(name));
      setName("");
      setValue({ ...value, ingredients: ingredients })
      setIngredientClass(true)
    }
    if (name !== '') {
      setisIngredientvalid(false)
    }
    else {
      setisIngredientvalid(true)
    }
  }
  const addSteps = () => {   
    if (stepsfield) {
      setSteps(steps,steps.push(stepsfield));
      setValue({ ...value, steps:steps })
      
      setStepsField("");
      setStepsClass(true)
    }
    if (stepsfield !== '') {
      setisStepvalid(false)
    }
    else {
      setisStepvalid(true)
    }
  }
  const remove = (e) => {
    const name = e;
    setIngredients(
      ingredients.filter(function (item) {
        return item !== name;
      })
    );
    setValue({
      ...value, ingredients: ingredients.filter(function (item) {
        return item !== name;
      })
    })

  }
  const removeSteps = (e) => {
    const name = e;
    setSteps(
      steps.filter(function (item) {
        return item !== name;
      })
    );
    setValue({
      ...value, steps: steps.filter(function (item) {
        return item !== name;
      })
    })
  }

  const handleClose = async () => {
    setOpen(false);
    
  };

  const uploadRecipe = async (e) => {
    // setOpen(false);
    e.preventDefault();
    if (value.title === '') {
      setIsFormInvalid(true);
    }
   else if (value.ingredients.length === 0) {
      setisIngredientvalid(true)
    }
    else if (value.steps.length === 0) {
      setisStepvalid(true)
    }
   else if (value.calories === '') {
      setIscaloriesValid(true)
    }
   else if (value.prepTime === '') {
      setIsPreptimeValid(true)
    }
   
   else if(value.image === ''){
      setIsImageValid(true)
    }
    else if(value.mealType === ''){
      setIsMealtypeValid(true)
    }
   else if (value.servings === '') {
      setIsServingValid(true)
    }
   
    else {
      setUploaddisable(true)
      let formData = new FormData()
      formData.append('file', image.image)
      let response = {};
      let errored = false;
      try {
       let image=await axios.post(`${config.endpoint}/recipe/uploadimg`, formData, {
        }).then(res => {
            return res
        })

        if(image.data.userCreated.image){
        response = await (
          await fetch(`${config.endpoint}/recipe/upload`, {
            method: "POST",
            headers:{
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
            title: value.title,
            ingredients: value.ingredients,
            steps: value.steps,
            calories: Number(value.calories),
            prepTime: value.prepTime,
            image:image.data.userCreated.image,
            foodType: value.foodType,
            mealType: value.mealType,
            servings: value.servings,
            })
          })
        ).json();
        setOpen(false)
        setUploaddisable(false)
        setValue(response);
        setresetform(true)
        }
      } catch (e) {
        errored = true;
        return errored;
      }
      getRecipe();
      setSteps([])
      setIngredients([])
      setValue(data);
      return value
      // return recipes
    }
    return value

  }

  const handleFileChange = (e) => {
    setImage({image:e.target.files[0]})
    setValue((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }))
  }

  const handleChangeMeal = (e) =>{
    const data = e.value;
    setuploadmeal(e)
    setValue((prevState) => ({
      ...prevState,
      mealType: data,
    }))
  }
  return (
    <Box>
      <Box className="filter-btn-box">

        <div className="filter-bar">
          <div className="filter-bar-tile">
            <label htmlFor="duration">Filters:</label>
          </div>

          <div className="filter-bar-tile">

            <Select value={meal} options={options} onChange={(e) => performMealFilter(e, meal)} placeholder="Meal Type" styles={{ menu: provided => ({ ...provided, zIndex: 7 }) }} />

            <div className="ms-3" style={{ color: "#b13d2f", cursor: "pointer" }} onClick={handleClear}>
              Clear
            </div>
          </div>

          <div className="filter-bar-tile">
            <Select value={duration} options={optionsDuration} onChange={(e) => performDurationFilter(e, duration)} placeholder="Duration" styles={{ menu: provided => ({ ...provided, zIndex: 7 }) }} />
            <div className="ms-3" style={{ color: "#b13d2f", cursor: "pointer" }} onClick={handleClearDuration}>
              Clear
            </div>
          </div>
          <Stack className="search-field" style={{ padding: '0px 20px' }}>
            <TextField
              className="search-desktop"
              size="small"
              style={{ width: '120px' }}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="search-bar" color="primary" />
                  </InputAdornment>
                ),
              }}
              placeholder="Search"
              name="search"
              onChange={search}
            />
          </Stack>
        </div>

        <Stack direction="row" spacing={2}>
          <Button
            className="upload-button"
            startIcon={<UploadIcon />}
            variant="contained"
            onClick={handleClickOpen}
            id="upload-btn"
          >
            Upload
          </Button>
          <Box>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle className="dialog">
                Upload Recipe
                <IconButton
                  aria-label="close"

                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent className="dialog">
                <TextField
                  autoFocus
                  error={isFormInvalid}
                  margin="dense"
                  id="title"
                  label="Title"
                  type="text"
                  helperText="Enter your recipe name"
                  fullWidth
                  name="title"
                  variant="outlined"
                  value={value.title}
                  
                  onChange={handleChange}
                />
                <div style={{ display: "flex", justifyContent: 'space-around', alignItems: 'baseline' }}>
                  <TextField
                    error={isIngredientValid}
                    autoFocus
                    margin="dense"
                    id="ingredients"
                    label="Ingredients"
                    type="text"
                    helperText={isIngredientValid ? "Add text in field before clicking on add button" : "Enter required ingredients required in your recipe"}
                    style={{ width: "90%" }}
                    variant="outlined"
                    name="ingredients"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />


                  <IconButton size="small" onClick={add} sx={{ color: "#1976d2" }}><AddCircleIcon /></IconButton>

                </div>
                {typeof value.ingredients !== 'undefined' && (
                  <ul className={changeIngredientClass ? "upload-ingredient-ul" : ""}>

                    {value.ingredients.map((val, index) => (

                      <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <li style={{ marginRight: '30px', lineBreak: 'anywhere' }}>{val} </li>
                        <IconButton size="small" onClick={() => remove(val)}><CancelIcon sx={{ color: "#d32f2f" }}></CancelIcon></IconButton>
                      </div>
                    ))}
                  </ul>
                )}

                <div style={{ display: "flex", justifyContent: 'space-around', alignItems: 'baseline' }}>
                  <TextField
                    error={isStepValid}
                    autoFocus
                    margin="dense"
                    id="steps"
                    label="Steps"
                    type="text"
                    helperText={isStepValid ? "Add text in field before clicking on add button" : "Enter clear instruction to follow your recipe"}
                    fullWidth
                    variant="outlined"
                    name="steps"
                    value={stepsfield}
                    style={{ width: "90%" }}
                    onChange={e => setStepsField(e.target.value)}
                  />
                  <IconButton size="small" onClick={addSteps} sx={{ color: "#1976d2" }}><AddCircleIcon /></IconButton>

                </div>
                {typeof value.steps !== 'undefined' && (
                  <ul className={changeStepsClass ? "upload-ingredient-ul" : ""}>

                    {value.steps.map((val, index) => (

                      <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <li style={{ marginRight: '30px', lineBreak: 'anywhere' }}>{val} </li>
                        <IconButton size="small" onClick={() => removeSteps(val)}><CancelIcon sx={{ color: "#d32f2f" }}></CancelIcon></IconButton>
                      </div>
                    ))}
                  </ul>
                )}
                <TextField
                  autoFocus
                  error={isCaloriesvalid}
                  margin="dense"
                  id="calories"
                  label="Calories"
                  type="text"
                  helperText="The title will be representative text of video"
                  fullWidth
                  variant="outlined"
                  name="calories"
                  value={value.calories}
                  onChange={handleChange}
                />

                <TextField
                  autoFocus
                  error={isPreptimeValid}
                  margin="dense"
                  id="prepTime"
                  label="Preparation Time"
                  type="text"
                  helperText="Enter total time required to make your recipe"
                  fullWidth
                  variant="outlined"
                  name="prepTime"
                  value={value.prepTime}
                  onChange={handleChange}
                />


                <input type='file' name='file' onChange={(e)=>handleFileChange(e)} className="image-upload" style={isImageValid ? {borderColor:'#d32f2f'} : {borderColor:'-moz-initial'}}></input>
                <FormHelperText style={isImageValid ? {color:'#d32f2f',margin: '1px 1px 10px 10px' } : { margin: '1px 1px 10px 10px' }}>Upload your recipe image in jpg,jeg,png,webp format</FormHelperText>
                {/* {value.image && <img src={URL.createObjectURL(value.image)} alt="Uploaded Image" height="300" />} */}
                <Select value={uploadmeal} options={options} onChange={(e) => handleChangeMeal(e)} placeholder="Meal Type" styles={ isMealTypeValid ?  { container: provided => ({ ...provided, zIndex: 7 ,border:'1px solid red',borderRadius:'4px'})} : { container: provided => ({ ...provided, zIndex: 7})}  } />
                <FormHelperText style={ isMealTypeValid ? { margin: '1px 1px 1px 10px',color:'#d32f2f' } : {}}>Input what meal should be your recipe</FormHelperText>
                <TextField
                  autoFocus
                  error={isServingValid}
                  margin="dense"
                  id="servings"
                  label="Servings"
                  type="text"
                  helperText="Mention how many servings can be made from your given ingredients"
                  fullWidth
                  variant="outlined"
                  name="servings"
                  value={value.servings}
                  onChange={handleChange}
                />

              </DialogContent>
              <DialogActions className="dialog">
                <Button className="cancel-button" id="upload-btn-cancel" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  className="submit-button"
                  id="upload-btn-submit"
                  variant="contained"
                  onClick={(e)=>uploadRecipe(e)}
                  disabled={uploaddisable ? true : false}
                >
                  Upload recipe
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
export default Header