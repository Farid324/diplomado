//src/app.js
import express from 'express';

const app = express();

import usersRoutes from './routes/users.routes.js';
import morgan from 'morgan';

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
//Routes
app.use('/api/users', usersRoutes);

export default app;