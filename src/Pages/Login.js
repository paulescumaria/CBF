import React, { useState } from 'react';
import { TextField, Button, Grid, Avatar } from '@mui/material';
import '../Styles/App.css';
import { LockClockOutlined } from '@mui/icons-material';
import { login } from '../Services/login.service';
import { useNavigate } from 'react-router-dom';


function Login(props) {
    const avatarStyle = {backgroundColor: '#1bbd7e'}

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("") 
    
 
    const getData = (e) => {
        if (email !== "" && password !== "") {
            login({
                'userEmail': email,
                'userPassword': btoa(password)
            }).then((result) => {
                if (result.data !== null) {
                    if (result.data.length === 0) {
                        alert("User not found !")
                     } else {
                         localStorage.setItem('userEmail', result.data[0].userEmail)
                         localStorage.setItem('userPassword', result.data[0].userPassword)
                         localStorage.setItem('isAdmin', JSON.stringify(result.data[0].isAdmin))
                         props.stateManager(true)
                         navigate("/home")
                     }
                } else {
                    alert("Email or password incorrect !")
                }
            })
        } else {
            alert("Email and password required !");
        }
    }


    const getEmail = (e) => {
          setEmail(e.target.value)  
    }

    const getPassword = (e) => {
          setPassword(e.target.value)
    }


    return (
    
        <div className="boxLogin">
            <Grid container direction="column" justifyContent="space-between" alignItems="center"><br></br>
                <Avatar style={avatarStyle}><LockClockOutlined></LockClockOutlined></Avatar><br></br><br></br>
                <TextField onChange={getEmail} id="email" label="Email Address" value={email} required /><br></br>
                <TextField onChange={getPassword} id="password" label="Password" value={password} type='password' required /><br></br>
                <Button onClick={getData} type='submit' variant="contained"> Login </Button>
            </Grid>
        </div>
    
    );
}

export default Login;