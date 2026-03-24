import 'dotenv/config';
import express from 'express';
import { connectDB } from './utils/db';
import contactRouter from './routes/contact';

const app = express();
app.use(express.json());

app.use('/api/contact', contactRouter);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
