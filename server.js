import cors from 'cors';
import express from 'express';
import items from './routes/items.js';

const app = express();
const port = process.env.PORT || 5050;

app.use('/items', items);
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

