import { Router } from 'express';
import Profile from '../controllers/ProfileController';

const profileRouter = Router();

const profile = new Profile();

profileRouter.get('/', profile.index);
profileRouter.get('/:id', profile.show);


export default profileRouter;
