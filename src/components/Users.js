import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom"; 
import {Checkbox,MenuItem,Grid,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Box,Table, TableContainer, TableHead, TableRow,TableCell,TableBody, TablePagination, TableSortLabel, Typography, Button, TextField, FormGroup, FormLabel, FormControlLabel} from '@mui/material'
import { useUser } from '../UserContext';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';
import { FitScreen } from '@mui/icons-material';



const Users = () => {
  const [rows,setRows] = useState([])
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(5); 
  const navigate = useNavigate();
  const {user} = useUser()
  const [open, setOpen] = useState(false);
  const [valid, setValid] = useState(true);
  const [selectedRow, setSelectedRow] = useState('')
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    const [orderBy, setOrderBy] = useState('');
    const [filter,setFilter] = useState({})

    const [selectedUsername, setSelectedUsername] = useState('')
  

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/")
    }
    axios.post("http://localhost:3001/user/users",{
      // page, limit, sort, filter
      page,
      limit: rowsPerPage,
    }).then((res)=>{
      // console.log("data from users ", res.data)
      const response = res.data
      // console.log(response)
      setRows(response)
    }).catch(err=>{console.log(err.response.data.message)})
  }, []);

  const tableheaders = [
    {
      // id:1,
      field:'Username'
    },
    {
      // id:2,
      field:'Email'
    },
    {
      // id:3,
      field:'Country'
    },
    {
      // id:4,
      field:'State'
    },
    {
      // id:5,
      field:'City'
    },
    // {
    //   // id:6,
    //   field:''
    // },
    
    // {
    //   // id:7,
    //   field:''
    // },

  ]
    //input handle events
    const handleUsername = (event)=>{
      // console.log(event.target.value)
      setUsername(event.target.value)
    }
    const validateEmail = (email) => {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(String(email).toLowerCase());
    };
    const handleEmail = (event)=>{
      // console.log(event.target.value)
      setEmail(event.target.value)
      setValid(validateEmail(email));
    }

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
      setState(newState);
      axios.post("http://localhost:3001/user/cities", { state: newState }).then((res) => {
        console.log("api data ", res.data);
        setCities(res.data)
      });
  
      };
  
  const deleteRow = async (username) => {
    console.log("to be deleted", username)
    await axios.put("http://localhost:3001/user/deleteuser",{
      username
    }).then((res)=>{
      console.log(res);
      const updatedRows = rows.filter((row)=>{return row.username!==username})
      setRows(updatedRows)
    })
  }

  
  function handleChangePage(event, newPage) {
    setPage(newPage);
    
  }
  
  const handleChangeRowsPerPage = async (event) => {
    console.log("changed rows ",event.target.value)
    console.log("changed page ",page)

    const newRowsPerPage = parseInt(event.target.value, 10);
    
    //recalling api to update user list for pagination

    await axios.post("http://localhost:3001/user/users",{
      page:1,
      limit:newRowsPerPage
    }).then((res)=>{
      const paginatedRows = res.data
      setRows(paginatedRows)
      setRowsPerPage(newRowsPerPage);
      // setPage(0); 
    })
  }

  const handleDialogueClickOpen = async(row) => {
    console.log("row to be updated",row)
    setOpen(true);
    setSelectedRow(row.username)
    setUsername(row.username)
    setEmail(row.email)
    setCountry(row.country)
    setCity(row.city)
    setState(row.state)
    await axios.get("http://localhost:3001/user/countries").then((res)=>setCountries(res.data))
  };

  const handleDialogueClose = () => {
    setOpen(false);
  };
  const handleDialogueUpdate = async(user) =>{
    console.log("user to be updated", user)
    await axios.post("http://localhost:3001/user/updateuser",{
      user,username,email,country,state,city
    }).then((res)=>{
      console.log(res);
    }).catch(err=>{
      console.log(err)
    })
    setOpen(false)
  }
  const handleUsersSort = async (field) => {

    console.log("field name to be sorted ", field)
    await axios.post("http://localhost:3001/user/users",{
      sort:field
    }).then((res)=>{
      const sortedRows = res.data
      console.log("sorted ",sortedRows)
      setOrderBy(field)
      setRows(sortedRows)
    })
  };

  const usernameRowClick = (fieldname, fieldvalue) => {
    // console.log(fieldname)
    // console.log(fieldvalue)
    const field = {
      [fieldname]: fieldvalue
    };

    setFilter(field)
  }
  
  const emailRowClick = (fieldname, fieldvalue) => {
    // console.log(fieldname)
    // console.log(fieldvalue)
    const field = {
      [fieldname]: fieldvalue
    };

    setFilter(field)
  }
  const countryRowClick = (fieldname, fieldvalue) => {
    // console.log(fieldname)
    // console.log(fieldvalue)
    const field = {
      [fieldname]: fieldvalue
    };

    setFilter(field)
  }
  const stateRowClick = (fieldname, fieldvalue) => {
    // console.log(fieldname)
    // console.log(fieldvalue)
    const field = {
      [fieldname]: fieldvalue
    };

    setFilter(field)
  }

  const cityRowClick = (fieldname, fieldvalue) => {
    // console.log(fieldname)
    // console.log(fieldvalue)
    const field = {
      [fieldname]: fieldvalue
    };

    setFilter(field)
  }

  const openFilterDialog = async() =>{
    console.log("hi i am filter ",filter)
    
    if(filter){

      await axios.post("http://localhost:3001/user/users",{
        filter
      }).then((res)=>{
        const updatedrows = res.data
        console.log(res)
        setRows(updatedrows)
      }).catch(err=>{console.log(err)})
    }
    else{
      await axios.post("http://localhost:3001/user/users",{
        page,
        limit: rowsPerPage,
      }).then((res)=>{
        const updatedrows = res.data
        console.log(updatedrows)
        setRows(updatedrows)
      })
    }
    setFilter({})
  }


  const signOut = (event) => {
      localStorage.removeItem("userId")
      navigate("/")
    }

  return (
  
  <Box elevation={10} sx={{
    display: 'flex',
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url("/images/sunset.jpg")',
    backgroundSize: 'cover',
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
    p:5,
    }}>
      <Typography
        variant='h3'
        sx={{
          fontWeight:500
        }}
      >
        Welcome {user}
      </Typography>
      {/* <Typography
        variant='h4'
        sx={{
          
        }}
      >
        User Management Portal
      </Typography> */}
      <Button onClick={signOut} 
        sx={{
          // width: '100%',
          mt:5,
          p:2,
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
        Sign Out
      </Button>
      <TableContainer sx={{
          mr:10,
          mt:5,
          ml:10,
          mb:5,
          width:"70%",
          borderRadius:3,
          
          }}>
        <Table >
          <TableHead sx={{
            backgroundColor:"#7E57C2",
            backgroundImage: 'linear-gradient(to bottom, #7E57C2, #5A3EAE)',  
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',  
            
          }}>
            <TableRow>
              {
                tableheaders.map((header)=>{
                  return(
                    <TableCell sx={{color:"white"}}> 
                      <TableSortLabel
                      sx={{
                        '&:hover': {
                          color:"#fff"  
                        },
                      }} 
                      onClick={() => handleUsersSort(header.field.toLowerCase())}
            >
            {header.field}
            </TableSortLabel>
            </TableCell> 
                  )
                })
              }
              <TableCell>

              </TableCell>
              {/* filter icon heading */}
              <TableCell sx={{textAlign:"center"}}>
                <Button onClick={openFilterDialog}>
                {/* <Dialog onClose={closeFilterDialog} open={openFilter} >
                  <Box  sx={{p:5}}>
                  <DialogTitle>Set backup account</DialogTitle>
                  <DialogContent>

                  
                  {tableheaders.map((header)=>{
                    return(
                      <FormGroup>
                         <FormControlLabel control={<Checkbox onClick={(event)=>{console.log(event.target.value)}} />} label={header.field} />
                      </FormGroup>
                    )
                  })}
                  </DialogContent>

                  <DialogActions>
                        <Button onClick={closeFilterDialog} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={handleDialogueFilter} color="primary">
                          OK
                        </Button>
                      </DialogActions>
                      </Box>
                </Dialog> */}
                <FilterListIcon sx={{color:"white"}}/>
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{
            backgroundColor:"#f0f0f0",
            backgroundImage: 'linear-gradient(to bottom, #f0f0f0, #fff)',  
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',  
          }}>
             {
              rows.map((row)=>{
               return (
               <TableRow key={row._id} sx={{cursor:"pointer"}}>
                  <TableCell onClick={()=>usernameRowClick("username",row.username)} sx={{'&:hover': {
                        backgroundColor:"#c2c2c2"  
                      }}}>
                    {row.username}
                  </TableCell>

                  <TableCell onClick={()=>emailRowClick("email",row.email)} sx={{'&:hover': {
                        backgroundColor:"#c2c2c2"  
                      }}}>
                    {row.email}
                  </TableCell>

                  <TableCell onClick={()=>countryRowClick("country",row.country)} sx={{'&:hover': {
                        backgroundColor:"#c2c2c2"  
                      }}}>
                    {row.country}
                  </TableCell>

                  <TableCell onClick={()=>stateRowClick("state",row.state)} sx={{'&:hover': {
                        backgroundColor:"#c2c2c2"  
                      }}}>
                    {row.state}
                  </TableCell>

                  <TableCell onClick={()=>cityRowClick("city",row.city)} sx={{'&:hover': {
                        backgroundColor:"#c2c2c2"  
                      }}}>
                    {row.city}
                  </TableCell>
                  <TableCell>
                    <Button sx={{color:"#7E57C2"}} onClick={()=>handleDialogueClickOpen(row)}>
                    Update
                    </Button>

                    <Dialog open={open} onClose={handleDialogueClose} sx={{backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>
                      <DialogTitle>Update User</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                        <Grid container spacing={2} sx={{p:2}}>
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
                        </DialogContentText>
                      </DialogContent>

                      <DialogActions>
                        <Button onClick={handleDialogueClose} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={()=>handleDialogueUpdate(selectedRow)} color="primary">
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>
     
                  </TableCell>

                  <TableCell>
                    <Button sx={{color:"#7E57C2"}}
                    onClick={()=>deleteRow(row.username)}
                    >
                    Delete
                    </Button>
                  </TableCell>
                </TableRow>
                )
              })
             }
          </TableBody>
        </Table>
      <TablePagination 
                rowsPerPageOptions={[2, 3, 5]} 
                component="div"
                count={rows.length} 
                rowsPerPage={rowsPerPage} 
                page={page} 
                onPageChange={handleChangePage} 
                onRowsPerPageChange={handleChangeRowsPerPage} 
                sx={{
                  backgroundColor:"#7E57C2",
                  backgroundImage: 'linear-gradient(to bottom, #7E57C2, #5A3EAE)',  
                  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',  
                  color:"white"
                }}
            /> 
      </TableContainer>
        
        </Box>
  )
}

export default Users
