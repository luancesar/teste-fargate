import jwt from 'jsonwebtoken';
import AuthenticateService from '../services/AuthenticateService';
import authConfig from '../config/auth';
import { Response, Request} from 'express';

export default class AuthenticateController {
  async store(req: Request, res: Response) {
    try {

      const authenticate = AuthenticateService.store(req.body)
      return res.json(authenticate);

    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
