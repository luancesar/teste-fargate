/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-underscore-dangle */
import { Response, Request } from 'express';
import * as Yup from 'yup';
import UserService from '../services/UserService';

export default class UserController {
  async index(req: Request, res: Response) {
    const users = await UserService.index();
    res.json(users);
  }

  async show(req: Request, res: Response) {
    const user = await UserService.show(req.params.id);
    return res.json(user);
  }

  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    await schema.validate(req.body, {
      abortEarly: false,
    });

    const newUser = UserService.store(req.body);
    return res.status(201).json(newUser);
  }

  async update(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword: string, field: Yup.ObjectSchema) =>
          oldPassword ? field.required() : field
        ),
      confirmationPassword: Yup.string()
        .min(6)
        .when('password', (password: string, field: Yup.ObjectSchema) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
    });

    await schema.validate(req.body, {
      abortEarly: false,
    });

    UserService.update(req.params.id, req.body);

    return res.status(204).json();
  }

  async delete(req: Request, res: Response) {
    await UserService.delete(req.params.id);

    return res.status(204).json();
  }
}
