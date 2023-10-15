import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
// import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';

import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

import User from './models/User.js';
import Country from './models/Country.js';
import State from './models/State.js';
import City from './models/City.js';

import { UserRouter } from './routes/users.js';
import { UserDetailRouter } from './routes/userDetails.js';

const app = express();
const port = 3001;
app.use(express.json());
// app.use(express)
app.use(cors())


app.listen(port, () => console.log(`Server started on port: http://localhost:${port}`));
app.get("/", (req, res) => {
    res.json({ message: "User Application." });
  })

  app.use("/auth", UserRouter)
  
  app.use("/user", UserDetailRouter)
  
  let mongoURI = process.env['MONGO_URI']
  await mongoose.connect(mongoURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }).then(()=>console.log("mongodb connected"));


// Write a script to populate the Country, State, and City tables with sample data.
// const usersData = [
//     { username: 'Kashish',email: 'kashishfatima@gmail.com', country: "Pakistan", state: "Sindh", city: "Karachi" },
//     { username: 'Talha', email: 'talha@gmail.com', country: "Pakistan", state: "Sindh", city: "Karachi" },
//     { username: 'Sundus', email: 'sundus@gmail.com', country: "Pakistan", state: "Sindh", city: "Hyderabad" },
//     { username: 'Ali', email: 'ali@gmail.com', country: "Pakistan", state: "Sindh", city: "Mirpurkhaas" },
//     { username: 'Efshal', email: 'efshal@gmail.com', country: "Pakistan", state: "Punjab", city: "Lahore" },
//     { username: 'Usama', email: 'usama@gmail.com', country: "Germany", state: "Bavaria", city: "Munich" },
//     { username: 'Hassan', email: 'hassan@gmail.com', country: "US", state: "California", city: "San Francisco" },
//   ];

//     await User.insertMany(usersData)
//       .then(() => console.log("data inserted"))
//       .catch(err => console.log("data not inserted ", err));

// const countryData = [
//     {name: "Pakistan"},
//     {name: "Germany"},
//     {name: "US"},
//     {name: "Italy"},    
// ]

// await Country.insertMany(countryData)
// .then(()=>console.log("country data inserted"))
// .catch(err=>console.log("country data not inserted",err))

// const cityData = [
//     {name: "Karachi", state:"Sindh", country:"Pakistan"},
//     {name: "Hyderabad", state:"Sindh", country:"Pakistan"},
//     {name: "Mirpurkhaas", state:"Sindh", country:"Pakistan"},
//     {name: "Lahore", state:"Punjab", country:"Pakistan"},
//     {name: "Munich", state:"Bavaria", country:"Germany"},
//     {name: "San Francisco", state:"California", country:"US"},
// ]

// await City.insertMany(cityData)
// .then(()=>console.log("city data inserted"))
// .catch(err=>console.log("city data not inserted ",err))

// const stateData = [
//     {name: "Sindh", country:"Pakistan"},
//     {name: "Punjab", country:"Pakistan"},
//     {name: "Bavaria", country:"Germany"},
//     {name: "California", country:"US"},
// ]

// await State.insertMany(stateData)
// .then(()=>console.log("state data inserted"))
// .catch(err=>console.log("state data not inserted ", err))

