import express from 'express';
import cors from 'cors';

import config from '../config/env'
import appRoutes from './routes'

const app = express();
app.use(cors({ origin: '*' }));

const port = config.port;

app.use('/v1', appRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
