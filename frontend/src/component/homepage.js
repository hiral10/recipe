import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Stack,
    Button,
    Pagination,
  } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../App";
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import { Link } from "react-router-dom";
import './homepage.css'
import Cook  from '../images/cook.png'
import {  getRecipes } from "../features/recipeSlice";
import Header from "./header";
const Homepage=()=>{
   const { recipes } = useSelector((state) => state.recipe);
   const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(8);
   const indexOfLastRecord = currentPage * recordsPerPage;
   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
   let nPages;
   let currentRecords=[];
   if(typeof recipes!== 'undefined'){
   currentRecords = recipes.slice(indexOfFirstRecord, indexOfLastRecord);
   nPages = Math.ceil(recipes.length / recordsPerPage)
   }
   const dispatch = useDispatch();

   const page = (e, p) => {
    setCurrentPage(e, p);
    const pageNumber = Math.max(1, p);
    setCurrentPage(() => Math.min(pageNumber, nPages));
}
  useEffect(() => {
   getRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <div>
      <Header/>
        <Box style={{display:"flex",justifyContent:"center"}} className="box">
             {typeof recipes !== "undefined" && (
          <Grid container spacing={2} sx={{ m: 2 }} alignItems="stretch" justifyContent="center" className="grid">
            {currentRecords.map((ele) => {
              return (
                <Grid item  xs={8} md={3} key={ele._id} className="recipe-grid">
                  {/* <span className="paper-clip"></span> */}
                    <Card className="recipe-tile" sx={{ maxWidth: 345 }}>
                    < div className="overlay">
                        <div className="text">
                        <img src={Cook} style={{height:"100px"}}/> 
                        <div>
                        <Link to={"/recipe/" + ele._id} className="recipe-tile-link" style={{textDecoration:"none"}}>
                       <Button variant="contained" className="cook-btn">let's cook</Button>
                       </Link>
                          </div>
                        </div>
                      </div>
                      <CardMedia
                        // style={{ height: "70%" }}
                        className="image"
                        sx={{ height: 200 }}
                        component="img"
                        image={ele.image}
                        alt={ele.title}
                      />
                      <CardContent>
                        <Box>
                        <Typography
                          component="h5"
                          variant="h5"
                          className="nheadingrs"
                        >
                          {ele.title}
                          <span className="rsvegnonveg veg"><span className="veg"></span></span>
                        </Typography>
                       

                        </Box>
                        <Box style={{display:"flex",justifyContent:'space-between',padding:"10px"}}>
                        <Stack direction="row" alignItems="center">
                          <WhatshotOutlinedIcon style={{height:"20px" ,color:"red"}} />
                          <Typography
                            variant="subtitle1"
                            color="textSecondary"
                          >
                        {ele.calories}

                          </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" gap="2px">
                        <ScheduleOutlinedIcon style={{height:"20px"}}/>
                          <Typography
                            variant="subtitle1"
                            color="textSecondary"
                          >
                            {ele.prepTime}
                          </Typography>
                        </Stack>
                          </Box>
                      </CardContent>
                    </Card>

                </Grid>
              );
            })}
          </Grid>
          )}
         
      </Box>
      <div style={{display:'flex',flexDirection:'row-reverse'}}>
      <div className="pagination">
        <Pagination count={nPages} onChange={page} color="primary" showFirstButton={true} showLastButton={true} />
        </div>
        </div>
      </div>
    )
}
export default Homepage