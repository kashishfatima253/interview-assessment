import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Button, Card, CardActions, CardContent, Grid, TextField, Typography, Box } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import axios from 'axios';
// import {} from 'react-cookies'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const [_,setCookies] = useCookies("access_token")
  const navigate = useNavigate();

  // const navigateToUsers = () => {
  //   // 👇️ navigate to /contacts
  //   navigate('/users');
  // };

  const onSubmitLogin = async(event)=>{
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/auth/login",{
        username, password
      });

      // setCookies("access_token", response.data.token);
      console.log(response.data.token)

    } catch (error) {
      console.log(error);
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
        {/* <FormControl></FormControl> */}
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card elevation={10} sx={{ p: 5 }}>
            {/* <Card sx={{ p: 1, backgroundColor: '#f0f0f0', borderRadius: 4 }}> */}
              <AssignmentIcon sx={{ fontSize: 40, color: '#7E57C2' }} />
            {/* </Card> */}
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
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}
                  />
                </Grid>
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
                </Grid>
                <Grid item>
                  <Typography sx={{ m: 2 }}>
                    Don't have an account?
                    {/* <Button
                      sx={{
                        fontWeight: '500',
                        color: '#7E57C2',
                        '&:hover': {
                        //   backgroundColor: '#fff',
                          color: 'linear-gradient(to bottom, #5A3EAE, #3E2871)',
                        //   boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)',
                        },
                      }}
                    >
                      Create Account
                    </Button> */}
                    <Link to='/register'>Create Account</Link>
                  </Typography>
                </Grid>
              </Grid>
            {/* </CardActions> */}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
