import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User.js';
import Country from '../models/Country.js';
import State from '../models/State.js';
import City from '../models/City.js';

const router = express.Router()
// c. User List with Pagination, Sorting, and Filtering
// d. User Update
// e. User Delete

//getUsers
router.post("/users",  async(req,res)=>{

    if (!req.body) {
        const users = await User.find().exec();
        res.json(users);
      } else {
        const { page, limit, sort, filter } = req.body;
            let query = User.find()
            if(page && limit){

                if(page!=0){
    
                    const skip = (page - 1) * limit;
                    query.skip(skip).limit(parseInt(limit));
                }
                
            }
            if (filter) {
                query = query.find(filter);
            }
            
            if (sort) {
                query = query.sort(sort);
            }
            
            const users = await query.exec();
            res.json(users);
            
       
      }
      
    
})

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
router.post("/updateuser", async(req,res)=>{
    const { user, username, email, country, state, city } = req.body;

    if(username && email){

        await User.findOneAndUpdate({username:user}, {
          $set: {
            username:username,
            email:email,
            country,
            state,
            city
          }
        }).then(() => {
          res.json({ message: "Record updated" });
        });
    }
    // if(email){
    //     await User.findOneAndUpdate({username:user}, {
    //         $set: {
    //           email:email,
    //         }
    //       }).then(() => {
    //         res.json({ message: "Record updated" });
    //       });
    // }
    // if(country){
    //     await User.findOneAndUpdate({username:user}, {
    //         $set: {
    //           country:country,
    //         }
    //       }).then(() => {
    //         res.json({ message: "Record updated" });
    //       });
    // }
    // if(state){
    //     await User.findOneAndUpdate({username:user}, {
    //         $set: {
    //           state:state,
    //         }
    //       }).then(() => {
    //         res.json({ message: "Record updated" });
    //       });
    // }
    // if(city){
    //     await User.findOneAndUpdate({username:user}, {
    //         $set: {
    //           city:city,
    //         }
    //       }).then(() => {
    //         res.json({ message: "Record updated" });
    //       });
    // }
    
    
    
    
})

//userDelete
router.put("/deleteuser", async(req,res)=>{
    const {username} = req.body
    await User.findOneAndDelete({username}).then(()=>{
        res.json({message:"Record deleted"})
    })
    
})

export { router as UserDetailRouter }