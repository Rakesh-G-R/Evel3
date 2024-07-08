import express from 'express'
import { config } from 'dotenv'
import { connecttomdb } from './src/config/monfoDB.js';
import { sequelize } from './src/config/sqlDB.js';
import { userRoute } from './src/route/userRoute.js';
import { bookRouter } from './src/route/bookRouter.js';
import { auth } from './src/middlewares/auth.js';
import { orderRoute } from './src/route/orderRoute.js';
import { review } from './src/route/reviewRoute.js';
import cors from 'cors'



config();

const app=express();

app.use(express.json());

app.use(cors());

app.use('',userRoute);

app.use('',auth, bookRouter);

app.use('',orderRoute);

app.use('',review)

const port=process.env.PORT||9090;

const uri=process.env.URI||null;


app.listen(port,async()=>{
    try{
       await connecttomdb(uri);
       console.log('database connected successfully');
       await sequelize.authenticate();
       console.log('Aiven Database connected successfully');
       console.log(`server running at the port number ${port}`);
    }catch(err){
        console.log(err);
    }
})
