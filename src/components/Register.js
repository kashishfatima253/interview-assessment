import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Axios  from 'axios';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Button, Card, CardActions, CardContent, Grid, TextField, Typography, Box, MenuItem, FormControl } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const Register = () => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');

    const [countries, setCountries] = React.useState([])
    const [states, setStates] = React.useState([])
    const [cities, setCities] = React.useState([])


    useEffect(()=>{
        Axios.get("http://localhost:3001/user/countries").then((res)=>setCountries(res.data))
        
    },[countries])

    //register button submit event
    const navigate = useNavigate();
    const onSubmitRegister = async (event) =>{
    event.preventDefault();
    console.log("Username: ", username)
    console.log("Email: ", email)
    console.log("Password: ", password)
    console.log("Country: ", country)
    console.log("State: ", state)
    console.log("City: ", city)
    try {
      await Axios.post("http://localhost:3001/auth/register",{
        username, password, email, country, state,city
      }).then((res)=>{
        console.log(res.data.message)
        alert(res.data.message)
        // if(res.data){
          
        // }
        navigate('/')
      }).catch(err=>{
        // alert("Registration unsuccessful")
      })
    } catch (error) {
      console.log(error)
    }
  }

  //input handle events
  const handleUsername = (event)=>{
    // console.log(event.target.value)
    setUsername(event.target.value)
  }
  const handleEmail = (event)=>{
    // console.log(event.target.value)
    setEmail(event.target.value)
  }
  const handlePassword = (event)=>{
    // console.log(event.target.value)
    setPassword(event.target.value)
  }
  const handleCountryChange = (e) => {
      console.log("event val ",e.target.value);
      const newCountry = e.target.value;
    // setCountry(e.target.value);
    setCountry(newCountry, () => {
      console.log("state val ", country);
  
    });
    Axios.post("http://localhost:3001/user/states", { country: newCountry }).then((res) => {
      console.log("api data ", res.data);
      setStates(res.data)
    });
};


    const handleStateChange = (e) => {
      console.log("event val ",e.target.value);
      const newState = e.target.value;
    // setCountry(e.target.value);
    setState(newState, () => {
      console.log("state val ", state);

    });
    Axios.post("http://localhost:3001/user/cities", { state: newState }).then((res) => {
      console.log("api data ", res.data);
      setCities(res.data)
    });

    };
  
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
    
    {/* <Grid container justifyContent="center" alignItems="center"> */}
      {/* <Grid item xs={12} sm={8} md={6} lg={4}> */}
      {/* <Card sx={{ p: 1, backgroundColor: '#f0f0f0', borderRadius: 4 }}>  */}
          
    <Card elevation={10} sx={{width:'50%', p:5, m:5}}>
      <AssignmentIcon sx={{ fontSize: 40, color: '#7E57C2' }} />
      {/* </Card> */}
      <Typography variant="h4" sx={{ m: 2 }}>
      Interview Assessment
      </Typography>
      <Typography sx={{ m: 2 }}>
      Please enter details to create an account
    </Typography>
    {/* <FormControl> */}
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  sx={{ width: '100%' }}
                  color="secondary"
                  id="outlined-basic"
                  label="Username"
                  value={username}
                  variant="outlined"
                  onChange={handleUsername}
                />
                
              </Grid>
              <Grid item xs={6}>
                <TextField
                  sx={{ width: '100%' }}
                  color="secondary"
                  id="outlined-basic"
                  label="Email"
                  type="email"
                  value={email}
                  variant="outlined"
                  onChange={handleEmail}
                  
                />
              </Grid>
                  {/* Password and confirm password */}

              <Grid item xs={6}>
              <TextField
                  sx={{ width: '100%' }}
                  color="secondary"
                  id="outlined-password-input"
                  label="Confirm Password"
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  variant="outlined"
                  onChange={handlePassword}
                  
                />
                
              </Grid>
              <Grid item xs={6}>
                <TextField
                  sx={{ width: '100%' }}
                  color="secondary"
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  variant="outlined"
                  
                  
                />
              </Grid>

            {/* Country */}
              <Grid item xs={12}> 

                <TextField
                sx={{ width: '100%' }}
                id="outlined-select-country"
                select
                value={country}
                label="Country"
                defaultValue="Select"
                onChange={handleCountryChange}
                >
                {countries.map((option) => (
                    <MenuItem key={option.name} value={option.name}>
                    {option.name}
                    </MenuItem>
                ))}
                </TextField>
                
               </Grid>
            {/* State and City */}
              <Grid item xs={6}>
                
                <TextField
                sx={{ width: '100%' }}
                id="outlined-select-state"
                select
                label="State"
                value={state}
                defaultValue="Select"
                onChange={handleStateChange}
                >
                {states.map((option) => (
                    <MenuItem key={option.name} value={option.name}>
                    {option.name}
                    </MenuItem>
                ))}
                </TextField>
                
              </Grid>
              <Grid item xs={6}>
                <TextField
                sx={{ width: '100%' }}
                id="outlined-select-city"
                select
                value={city}
                label="City"
                defaultValue="Select"
                onChange={(event)=>setCity(event.target.value)}
                >
                {cities.map((option) => (
                    <MenuItem key={option.name} value={option.name}>
                    {option.name}
                    </MenuItem>
                ))}
                </TextField>
              </Grid>
            </Grid>

           
          
          </CardContent>

          {/* <CardActions> */}
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Button
                type='submit'
                onClick={onSubmitRegister}
                  sx={{
                    mt:2,
                    width: '50%',
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
                  SignUp
                </Button>
              </Grid>
              <Grid item>
                <Typography sx={{ m: 2 }}>
                  Already have an account?
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
                    Login
                  </Button> */}
                   <Link to='/'>Login</Link>
                </Typography>
              </Grid>
            </Grid>
          {/* </CardActions> */}
          {/* </FormControl> */}
        </Card>
       {/* </Grid> */}
    {/* //  </Grid> */}
  </Box>
  )
}

export default Register
