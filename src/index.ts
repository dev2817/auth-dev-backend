import express from 'express';
import cors from 'cors'
import 'dotenv/config';
import { logger } from './utils/logger.ts';
import connectDB from './db/mongoose.ts';
import router from './routes/index.routes.ts';

const app = express()
app.use(express.json())
app.use(cors())
app.options('*', cors());
app.use(express.urlencoded({ extended: true }));

const port: number = parseInt(process.env.PORT as string, 10) || 3000;

app.use('/auth-dev/api/test', (req, res) => {
    res.send({ message: "Server is running!", success: true })
})

app.use("/auth-dev/api", router)

connectDB();

app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
})