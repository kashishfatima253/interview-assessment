import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User.js';
import Country from '../models/Country.js';
import State from '../models/State.js';
import City from '../models/City.js';
import auth from '../middleware/auth.js';

const router = express.Router()
// c. User List with Pagination, Sorting, and Filtering
// d. User Update
// e. User Delete

//getUsers
router.post("/users", auth, async(req,res)=>{
    const users = await User.find()
    res.json(users)
    
})
//     const page = parseInt(req.body.page);
//   const pageSize = parseInt(req.body.pageSize);
  
//   const startIndex = (page - 1) * pageSize;
//   const endIndex = page * pageSize;
  
//   const paginatedUsers = users.slice(startIndex, endIndex);
  
//   const totalPages = Math.ceil(users.length / pageSize);
  
//   res.json({ users: paginatedUsers, totalPages });

// getCities
router.post("/cities", async (req,res)=>{
    const {state} = req.body
    const cities = await City.find({state})
    res.json(cities)
    
})

// getCountries
router.get("/countries", async(req,res)=>{
    const countries = await Country.find()
    res.json(countries)
})

// getStates
router.post("/states", async(req,res)=>{
    const {country} = req.body
    const states = await State.find({country})
    res.json(states)
})


//userUpdate
router.put("/updateuser", async(req,res)=>{
    const {username,email} = req.body
    await User.findOneAndUpdate({username}, {$set:{email:email}}).then(()=>{
        res.json({message:"Record updated"})
    })
    
})

//userDelete
router.put("/deleteuser", async(req,res)=>{
    const {username} = req.body
    await User.findOneAndDelete({username}).then(()=>{
        res.json({message:"Record deleted"})
    })
    
})

export { router as UserDetailRouter }