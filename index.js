import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './utils/index.js';

const app = express();
import dotenv from 'dotenv'
import router from './routes/index.js';

dotenv.config();

connectToDatabase();

app.use(express.json());
app.use(cors());
app.use('/api', router);


app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT);
}
);