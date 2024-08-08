import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './models/userRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export {PORT};