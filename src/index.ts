import 'dotenv/config';
import express from 'express';
import { connectDB } from './utils/db';
import contactRouter from './routes/contact';
import { startKeepAlive } from './utils/keepAlive';

const app = express();
app.use(express.json());

app.get('/health', (_, res) => res.sendStatus(200));
app.use('/api/contact', contactRouter);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    startKeepAlive();
  });
});
