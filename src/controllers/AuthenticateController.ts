/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Response, Request } from 'express';
import * as Yup from 'yup';
import AuthenticateService from '../services/AuthenticateService';

export default class AuthenticateController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    await schema.validate(req.body, {
      abortEarly: false,
    });
    const authenticate = AuthenticateService.store(req.body);
    return res.json(authenticate);
  }
}
