//src/app.js
import express from 'express';
import loginRoutes from "./routes/login.routes.js";
const app = express();

import usersRoutes from './routes/users.routes.js';
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';
import tasksRoutes from './routes/tasks.routes.js';

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
//Routes
app.use('/api/users', usersRoutes);
app.use("/api/login", loginRoutes);
//middleware
app.use('/api/tasks', tasksRoutes);
app.use(notFound);
app.use(errorHandler);
export default app;