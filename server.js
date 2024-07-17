import express from 'express';
import { config } from 'dotenv';
import { sequelize } from './src/config/sqlDB.js';
import { userRoute } from './src/route/userRoute.js';
import { bookRouter } from './src/route/bookRouter.js';
import { auth } from './src/middlewares/auth.js';
import { orderRoute } from './src/route/orderRoute.js';
import { review } from './src/route/reviewRoute.js';
import { createServer } from "http";
import { Server } from "socket.io";
import { logger } from './src/logs/logger.js';
import { connecttomdb } from './src/config/monfoDB.js';
import cors from 'cors'

config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());
app.use(cors());

app.use('', userRoute);
app.use('', auth, bookRouter);
app.use('', orderRoute);
app.use('', review);

const port = process.env.PORT || 9090;
const uri = process.env.URI || null;

logger.error('this is error log');
logger.info('this is info log');

io.on('connection', (socket) => {
    console.log('new user connected');
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

httpServer.listen(port, async () => {
    try {
        await connecttomdb(uri);
        console.log('MongoDB connected successfully');
        await sequelize.authenticate();
        console.log('SQL Database connected successfully');
        console.log(`Server running at port ${port}`);
    } catch (err) {
        console.log(err);
    }
});

export { io }; 
