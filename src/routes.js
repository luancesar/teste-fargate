import { Router } from 'express';

import User from './controllers/UserController';
import Profile from './controllers/ProfileController';
import authMiddleware from './middlewares/auth';
import Authenticate from './controllers/AuthenticateController';

const routes = new Router();

routes.get('/users', User.index);
routes.get('/users/:id', User.show);
routes.post('/users', User.store);

routes.post('/authenticate', Authenticate.store);
routes.use(authMiddleware);

routes.delete('/users/:id', User.delete);
routes.patch('/users/:id', User.update);
routes.get('/profiles', Profile.index);
routes.get('/profiles/:id', Profile.show);

export default routes;
