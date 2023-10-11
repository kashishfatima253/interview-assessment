import mongoose from "mongoose";


const CountrySchema = new mongoose.Schema({
    // Country (name)
    name: {type:String, required:true, unique:true},
    
})

const Country = mongoose.model('Country', CountrySchema);

export default Country;