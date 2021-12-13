import  mongoose from "mongoose";

const userLoginSchema = new mongoose.Schema({
username: String,
password: String,
isAdmin:{
    type: Boolean,
    default: false
    
}
})

const UserLogin = mongoose.model('UserLogin', userLoginSchema)
export default UserLogin;