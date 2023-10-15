import React, { useEffect, useRef, useState } from 'react';
import { useUser } from '../UserContext.js';
import { Link, useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Button, Card, CardContent, Grid, TextField, Typography, Box } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import axios from 'axios';
// import {} from 'react-cookies'

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isError, setIsError] = useState(false)
  const [valid, setValid] = useState(true);

  const { setUser } = useUser();
  
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const checkEmailIsValid = (event) =>{
    const input = event.target.value;
    setEmail(input);    
  }

  const onSubmitLogin = async(event)=>{
    event.preventDefault();
    setValid(validateEmail(email));
    if(!username){
      setIsError(true)
    }
    else if(!email){
      setIsError(true)
    }
    else if(username && email && valid){

      try {
  
        await axios.post("http://localhost:3001/auth/login",{
          username, email
        }).then((res)=>{
          console.log(res)
          const userid = res.data.user._id
          // alert(res.data.message)
          localStorage.setItem("userId",userid)
          setUser(res.data.user.username)
          navigate("/users")

        }).catch(err=>{
          alert(err.response.data.message)

        })
  
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("/images/sunset.jpg")',
        backgroundSize: 'cover',
        backgroundColor: '#f0f0f0',
        minHeight: '100vh',
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card elevation={10} sx={{ p: 5 }}>
              <AssignmentIcon sx={{ fontSize: 40, color: '#7E57C2' }} />
            <Typography variant="h4" sx={{ m: 2 }}>
              Interview Assessment
            </Typography>
            <Typography sx={{ m: 2 }}>
              Please enter your details to sign in
            </Typography>
            
            <CardContent>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    sx={{ width: '100%' }}
                    color="secondary"
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(event)=>setUsername(event.target.value)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    sx={{ width: '100%' }}
                    color="secondary"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={checkEmailIsValid}
                  />
                </Grid>

                {!valid && <p style={{ color: 'red' }}>Please enter a valid email address</p>}
              </Grid>
            </CardContent>

            {/* <CardActions> */}
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Button onClick={onSubmitLogin}
                    sx={{
                      width: '100%',
                      backgroundColor: '#7E57C2',
                      fontWeight: '500',
                      color: '#fff',
                      backgroundImage: 'linear-gradient(to bottom, #7E57C2, #5A3EAE)',  
                      boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',  
                      '&:hover': {
                        backgroundImage: 'linear-gradient(to bottom, #5A3EAE, #3E2871)',  
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.16)',  
                      },
                      '&:active': {
                        backgroundImage: 'linear-gradient(to bottom, #3E2871, #241A4E)',  
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)',  
                      },
                    }}
                  >
                    Login
                  </Button>
                  {
                    isError ? 
                    
                    <Typography sx={{mt:2, fontWeight:500, color:"red"}}>
                      {!username || !email? "Fill the form to continue" : ""}
                  </Typography> : 
                  ""
                  }
                </Grid>
                <Grid item>
                  <Typography>
                    Don't have an account?
                    
                    <Link to='/register'>Create Account</Link>
                  </Typography>
                </Grid>
              </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
