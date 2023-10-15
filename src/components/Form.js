import React, { useState,useEffect } from 'react'
import { Button, Card, CardActions, CardContent, Grid, TextField, Typography, Box, MenuItem, FormControl } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios  from 'axios';


const Form = () => {
    const [isError, setIsError] = useState(false)
  const [valid, setValid] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    const validateEmail = (email) => {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(String(email).toLowerCase());
    };
    useEffect(()=>{
        axios.get("http://localhost:3001/user/countries").then((res)=>setCountries(res.data))
        
    },[countries])

    //register button submit event
    const navigate = useNavigate();
    const onSubmitRegister = async (event) =>{
      event.preventDefault();
      
      if (!username || !email || !country || !state || !city || !valid) {
        setIsError(true);
        console.log("cannot register");
      } else {
        console.log("can register");
        axios.post("http://localhost:3001/auth/register",{
          username,
          email,
          country,
          state,
          city
        }).then((res)=>{
          console.log(res.data.message)
          navigate("/")
        }).catch(err=>{
          console.log(err.response.data.message)
        })
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
    setValid(validateEmail(email));
  }
  // const handlePassword = (event)=>{
  //   // console.log(event.target.value)
  //   setPassword(event.target.value)
  // }
  const handleCountryChange = (e) => {
      console.log("event val ",e.target.value);
      const newCountry = e.target.value;
    // setCountry(e.target.value);
    setCountry(newCountry, () => {
      console.log("state val ", country);
  
    });
    axios.post("http://localhost:3001/user/states", { country: newCountry }).then((res) => {
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
    axios.post("http://localhost:3001/user/cities", { state: newState }).then((res) => {
      console.log("api data ", res.data);
      setCities(res.data)
    });

    };
  return (
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
              {!valid && <p style={{ color: 'red' }}>Please enter a valid email address</p>}
                  {/* Password and confirm password */}

              {/* <Grid item xs={6}>
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
              </Grid> */}

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
  )
}

export default Form
