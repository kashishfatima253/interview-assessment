import mongoose from "mongoose";


const CitySchema = new mongoose.Schema({
    // City (name, state, country)
    name: {type:String, required:true, unique:true},
    state: {type:String, required:true},
    country: {type:String, required:true},
    
})

const City = mongoose.model("City", CitySchema)

export default City