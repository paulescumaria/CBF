import React from "react";
import { Grid } from "@mui/material";
import logo from '../media/logo.png'
import { Link } from "react-router-dom";



function Navbar() {

    const logout = () => {
      localStorage.setItem('userEmail', "")
      localStorage.setItem('userPassword', "")
      localStorage.setItem('isAdmin', false)
    }

    return (
     
          <Grid className='container' container direction="row" justifyContent="space-between" alignItems="center">
          <img src={logo} alt=""></img>
                <Grid container direction="row" justifyContent="flex-end" alignItems="center" className="nav">
                   <li><Link to="/home">Home</Link></li>
                   <li><Link to="/recipes">Recipes</Link></li>
                   <li><Link to="/" onClick={logout}>Logout</Link></li>
                </Grid>
          </Grid>
     
    )}

export default Navbar