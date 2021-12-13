import {Router} from 'express'
import UserLogin from '../model/userLoginModel.js';
import userValidation from './userValidate.js'
import dotenv from 'dotenv'
import jsonwebtoken from 'jsonwebtoken';
import { isAdmin } from '../middlewear/auth.middlewear.js';
dotenv.config('dotenv');
let env = process.env
const authRouter = Router()

authRouter.post('/register',   async (req , res)=>{
    try {
        await userValidation.validateAsync(req.body);
    } catch (error) {
        return res.send(error.message + 'error happen')
    }
    const usr = await new UserLogin(req.body)
    usr.save()
    res.send('user create')
})
authRouter.post('/login', async (req , res)=>{
   const {email , password} = req.body;
   const userFind = await UserLogin.findOne({email , password});
   if (userFind) {
       const token = jsonwebtoken.sign(JSON.stringify(userFind), env.JWT_KEY)
       res.json({token}) 
    
       
   } else {
       
       res.status(400).json({error : 'invalid auth token'})
   }
   
})

export default authRouter;