import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    // User (username, email, country, state, city)
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
    country: {type:String, required:true},
    state: {type:String, required:true},
    city: {type:String, required:true},
})

const User = mongoose.model('User', UserSchema);

export default User;