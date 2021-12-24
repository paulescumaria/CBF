import React from "react";
import CardRecipe from "../Components/CardRecipe";
import carbonara from '../media/carbonara.png'
import { useEffect, useState } from "react";
import { getRecipe } from "../Services/recipe.service";
import { Grid, Box, TextField, Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ScreenRecipe from "../Components/ScreenRecipe";
import Navbar from '../Components/Navbar';

function Recipes () {
    const [title, setTitle] = useState("")
    const [recipeList, setRecipe] = useState([])
    const [clickCount, setClickCount] = useState(0)
    const [showRecipe, setShowRecipe] = useState(false)
    const [screenMode, setScreenMode] = useState(0)
    const [idScreen, setIdScreen] = useState("")
    const [titleScreen, setTitleScreen] = useState("")
    const [timeScreen, setTimeScreen] = useState("")
    const [ingredientsScreen, setIngredientsScreen] = useState("")
    const [prepareScreen, setPrepareScreen] = useState("")

    useEffect(() => {
        getRecipe().then(
           (result) => {
               setRecipe(result.data)
           }
        )

    }, [])

    const filter = () => {
        if (title === "") {
           return recipeList
        }
        const filterByTitle = recipeList.filter(recipe => recipe.title.toLowerCase().includes(title.toLocaleLowerCase()))

        if (filterByTitle === undefined) {
            return []
        }
        return filterByTitle
    }

    const getTitle = (e) => {
        setTitle(e.target.value)
    }

    const adminMode = (e) => {
        setScreenMode(2);
        if (clickCount === 0) {

        setClickCount(clickCount + 1)

        } else if (clickCount === 1) {
           
            setClickCount(0)

        }
    }

    const newRecipe = (e) => {
        setShowRecipe(true);
        setScreenMode(1);
    }

    const handleCard = (e, recipeId, recipeTitle, recipeTime, recipeIngredients, recipePrepare) => {

        setIdScreen(recipeId);
        setTitleScreen(recipeTitle);
        setTimeScreen(recipeTime);
        setIngredientsScreen(recipeIngredients);
        setPrepareScreen(recipePrepare);

        if (localStorage.getItem('isAdmin') === "true" && clickCount === 1)
            setScreenMode(2);
        else if (localStorage.getItem('isAdmin') === "true" && clickCount === 0)
            setScreenMode(0);
        else if (localStorage.getItem('isAdmin') === "false")
            setScreenMode(0);

        setShowRecipe(true);
       return {"id":recipeId, "title":recipeTitle, "time":recipeTime, "ingredients":recipeIngredients, "prepare": recipePrepare};
    }

    const getImageById = (id) => {
        return carbonara;
    }

    return (
    <Box className="cardPage" sx={{ flexGrow: 1 }}>
         <Navbar />
        <Grid className="filterBox" container direction="row" justifyContent="center" alignItems="flex-start">  
        <br></br>
        <br></br>              
             <TextField sx={{ input: { color: 'white' }}} InputLabelProps={{style : {color : 'white'} }} onChange={getTitle} id="title" label="Find a recipe" value={title} required /><br></br>
             {localStorage.getItem('isAdmin') === "true" && clickCount === 0 ? <Button onClick={adminMode} variant="contained" color={"success"}> {"Edit Mode"}</Button> : ""}
             {localStorage.getItem('isAdmin') === "true" && clickCount === 1 ? <Button onClick={adminMode} variant="contained" color={"error"}> {"Exit Edit Mode"} </Button> : ""}
             {localStorage.getItem('isAdmin') === "true" && clickCount === 1 ? <Button onClick={newRecipe} variant="contained" color="success">New Recipe <AddCircleIcon /></Button> :""}
        </Grid>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
                filter().map((recipe, id) => {
                    return (
                    <Grid item key={id} spaceing={2}>
                       <CardRecipe key={id} showButton={clickCount === 1 ? true : false} openPop={setShowRecipe} media={carbonara} recipeid={recipe["_id"]} title={recipe.title} time={recipe.time} ingredients={recipe.ingredients} prepare={recipe.prepareSteps} onClick={handleCard}/>
                    </Grid>)
                })
            }
        </Grid>
        <Grid className="filterBox" container direction="row" justifyContent="center" alignItems="flex-start">
             <ScreenRecipe openWindow={showRecipe} closeWindow={setShowRecipe} recipeid={idScreen} title={titleScreen} time={timeScreen} ingredients={ingredientsScreen} prepare={prepareScreen} insertedImage={getImageById(idScreen)} screenType={screenMode}/>
        </Grid>
    </Box>
    )
}

export default Recipes