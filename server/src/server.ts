import { routes } from './routes';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors())

// app.use(cors({
//     origin: 'https://localhost:3333'
// }));

app.use(express.json());
app.use(routes)

app.listen(3333, () => {
    console.log('HTTP server running');
});