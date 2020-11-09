import { Router } from 'express';
import User from '../controllers/UserController';

const userRouter = Router();

const user = new User();

userRouter.get('/', user.index);
userRouter.get('/:id', user.show);
userRouter.post('/', user.store);
userRouter.delete('/:id', user.delete);
userRouter.patch('/:id', user.update);


export default userRouter;
