import express from 'express';

const app = express();

import usersRoutes from './routes/users.routes.js';

app.use('/api/v1/users', usersRoutes);

export default app;