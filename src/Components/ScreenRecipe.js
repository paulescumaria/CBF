import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Button } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Grid } from '@mui/material';
import { newRecipe, modifyRecipe } from '../Services/recipe.service';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteRecipe } from "../Services/recipe.service";


function ScreenRecipe (props) {
    const [id, setId] = useState(props.recipeid);
    const [title, setTitle] = useState(props.title)
    const [time, setTime] = useState(props.time)
    const [ingredients, setIngredients] = useState(props.ingredients)
    const [prepare, setPrepare] = useState(props.prepare)
    const [insertedImage, setInsertedImage] = useState(props.insertedImage)
    const screenType = props.screenType

    useEffect(() => {
        setId(props.recipeid);
        setTitle(props.title);
        setTime(props.time);
        setIngredients(props.ingredients);
        setPrepare(props.prepare);
        setInsertedImage(props.insertedImage);
    }, [props])

    const handleClose = () => {
        props.closeWindow(false);
        window.location.reload();
    };

    const saveRecipe = (e) => {
        if (title !== "" && time !== "" && ingredients !== "" && prepare !== "" &&
            title !== undefined && time !== undefined && ingredients !== undefined && prepare !== undefined) {
            newRecipe({
                "title": title,
                "time": time,
                "ingredients": ingredients,
                "prepareSteps": prepare
            }).then((result) => {
                if (result.data !== null && result.data !== undefined) {
                    alert("Recipe created !");
                    handleClose();
                }
            })
        } else {
            alert("All the fields are required !");
        }
    }

    const modifyRecipes = (e) => {
        if (id !== "" && title !== "" && time !== "" && ingredients !== "" && prepare !== "" &&
            id!== undefined && title !== undefined && time !== undefined && ingredients !== undefined && prepare !== undefined) {
            modifyRecipe({
                "id": id,
                "title": title,
                "time": time,
                "ingredients": ingredients,
                "prepareSteps": prepare
            }).then((result) => {
                if (result.data !== null && result.data !== undefined) {
                    alert("Recipe modified !");
                    handleClose();
                }
            })
        } else {
            alert("All fields need to be filled !")
        }
    }

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleTime = (e) => {
        setTime(e.target.value)
    }

    const handleIngredients = (e) => {
        setIngredients(e.target.value)
    }

    const handlePrepare = (e) => {
        setPrepare(e.target.value)
    }

    const deleteScreen = (e) => {
        if (id !== "" && id !== undefined) {
            deleteRecipe({"id": id}).then((result) => {
                if (result.data !== null && result.data !== undefined) {
                    alert("Recipe deleted !");
                   window.location.reload();
                }
            })   
        } else {
            alert("You need to select a card before to delete !")
        }
    }

    const selectedImage = (e) => {
        alert(e.target.files[0].name);
    }

    return (
    <div>
    <Dialog open={props.openWindow} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent>
        <Grid container direction="column" justifyContent="space-between" alignItems="flex-start">
            <div >
                {screenType !== 0 && screenType !== 1 ? <p>Delete recipe</p> : ""}
                {screenType !== 0 && screenType !== 1 ? <IconButton aria-label="delete" size="large" onClick={deleteScreen}><DeleteIcon /></IconButton> : ""}
                <p></p>
            </div>
        </Grid>
         <Grid container direction="column" justifyContent="space-between" alignItems="flex-start">
           <div className="screen-recipe-fields" >
               {screenType === 0 ? 
                <TextField className="screen-recipe-fields" onChange={handleTitle} id="title" disabled label="Title" value={title} required ></TextField> : 
                <TextField className="screen-recipe-fields" onChange={handleTitle} id="title" label="Title" value={title} required ></TextField>
                }
           </div>
           <div className="screen-recipe-fields">
               {
                   screenType === 0 ?
                       <TextField className="screen-recipe-fields" onChange={handleTime} id="time" disabled label="Time" value={time} required ></TextField> :
                       <TextField className="screen-recipe-fields" onChange={handleTime} id="time" label="Time" value={time} required ></TextField>
               }
            </div>
            {
                screenType === 0 ?
                <TextareaAutosize className="screen-recipe-fields" onChange={handleIngredients} maxRows={4} disabled placeholder="Ingredients" value={ingredients} required/> :
                <TextareaAutosize className="screen-recipe-fields" onChange={handleIngredients} maxRows={4} placeholder="Ingredients" value={ingredients} required/>
            }
            {
                screenType === 0 ?
                <TextareaAutosize className="screen-recipe-fields" onChange={handlePrepare} maxRows={4} disabled placeholder="Prepare Steps" value={prepare} required/> :
                <TextareaAutosize className="screen-recipe-fields" onChange={handlePrepare} maxRows={4} placeholder="Prepare Steps" value={prepare} required/>
            }
            {
                screenType === 0 ?
                "":
                <input type="file" onChange={selectedImage}/>
            }
            <img src={insertedImage} alt=""/>
         </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {screenType === 1 ? <Button onClick={saveRecipe} autoFocus> Save </Button> : ""}
          {screenType === 2 ? <Button onClick={modifyRecipes} autoFocus> Save </Button> : ""}
        </DialogActions>
      </Dialog>
    </div>
)}

export default ScreenRecipe