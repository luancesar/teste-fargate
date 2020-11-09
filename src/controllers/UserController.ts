/* eslint-disable no-underscore-dangle */
import UserService from '../services/UserService';
import { Response, Request} from 'express';

export default class UserController {
  async index(req: Request, res: Response) {
    try {
      const users = await UserService.index();
      res.json(users)
    } catch (error) {

      res.status(500).json({ error });

    }
  }

  async show(req: Request, res: Response) {
    try {
      const user = await UserService.show(req.params.id);
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error });
    }

  }

  async store(req: Request, res: Response) {
    try {
      const newUser = UserService.store(req.body);
      return res.status(201).json( newUser);

    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async update(req: Request, res: Response) {
    try {

      UserService.update(req.params.id, req.body)

      return res.status(204).json();

    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await UserService.delete(req.params.id);

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

