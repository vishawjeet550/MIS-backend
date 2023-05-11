import express from 'express';

import config from '../config/env'
import appRoutes from './routes'

const app = express();
const port = config.port;

app.use('/v1', appRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
