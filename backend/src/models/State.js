import mongoose from "mongoose";


const StateSchema = new mongoose.Schema({
    // State (name, country)
    name: {type:String, required:true, unique:true},
    country: {type:String, required:true},
    
})

const State = mongoose.model("State", StateSchema)

export default State