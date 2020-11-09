import { Router } from 'express';
import Authenticate from '../controllers/AuthenticateController';

const AuthenticateRouter = Router();
const autheticate = new Authenticate();

AuthenticateRouter.post('/', autheticate.store);


export default AuthenticateRouter;
