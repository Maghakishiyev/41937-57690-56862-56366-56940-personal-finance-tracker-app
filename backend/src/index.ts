import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { dbConnection } from './db';
import authRoutes from '../routes/authRoutes';
import uploadImg from '../routes/uploadImg';

dotenv.config();

const PORT = process.env.PORT;
if (!PORT) {
    console.error('No port value specified in .env...');
    process.exit(1);
}

const app: Application = express();

dbConnection().catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello from Express and TypeScript!" });
});


app.use('/api/auth', authRoutes);
app.use('/upload', uploadImg)

app.listen(parseInt(PORT, 10), () => {
    console.log(`Server is listening on port ${PORT}`);
});
