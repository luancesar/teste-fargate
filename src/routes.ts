import { Router } from 'express';

import User from './routes/User.routes';
import Profile from './routes/Profiles.routes';
import authMiddleware from './middlewares/auth';
import Authenticate from './routes/Authenticate.routes';

const routes = Router();

routes.use('/users', User);

routes.use('/autheticate', Authenticate)

routes.use(authMiddleware);

routes.use('/profiles', Profile);

export default routes;
