import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User.js'

const router = express.Router()

// 5. Develop the following RESTful API endpoints:
// a. Login
// b. Signup


router.post("/register", async(req,res)=>{
    const {username, password, email, country, state,city} = req.body

    const user = await User.findOne({username})

    if(user){
        return res.json({message:"User already exists"});

        // return false
    }
    else{
        // res.json({message:"User does not exist"})
        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username:username, 
            password:encryptedPassword,
            email:email,
            country:country,
            state:state,
            city:city
        })

        await newUser.save()

        return res.json({message:"Registration successfully"});
        // return true
    }

    
})

router.post("/login", async(req,res)=>{
    const {username,password} = req.body;

    const user = await User.findOne({username})

    try{
        if(!user){
        return res.status(400).json({message:"User does not exist"})
    }
    else{
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(isPasswordValid){

            // res.json({message:"sign in successful"})
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,
                { expiresIn: '30 days' },
                (err, token) => {
                  if (err) throw err;
                  res.json({ token });
                })
            res.json({token, userID: user._id})
        }
        else{
            res.status(400).json({message:"Invalid password"})
        }
    }
    }
    catch(error){
        res.status(500).send('Service unavailable')
    }
})



export { router as UserRouter }