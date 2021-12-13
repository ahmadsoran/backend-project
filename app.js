import express  from 'express'
import mongoose from 'mongoose'
import userRegister from './src/userRouter/userRegister.js';
import dotenv from 'dotenv'
dotenv.config('dotenv');

let ENV = process.env


const app = express();
app.get('/' , (req , res)=>{
    res.send('hello')
})

DBconnection()
async function DBconnection(){

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
await mongoose.connect(ENV.DATABASE_URL, {
    useNewUrlParser: true,

}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});


}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRegister)
app.listen(ENV.PORT , ()=>{
    console.log("server online")
})

export default app