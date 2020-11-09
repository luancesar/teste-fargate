/* eslint-disable no-underscore-dangle */
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import Profile from '../models/Profile';
import authConfig from '../config/auth';

export function generateToken(params : {}) {
  return jwt.sign(params, <jwt.Secret>authConfig.secret, {
    expiresIn: authConfig.expiresIn,
  });
}

interface IAuthenticate {
  email: string;
  password: string;
}

class AuthenticateService {
  async store(userAuthenticate: IAuthenticate) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    if (!(await schema.isValid(userAuthenticate))) {
      throw new Error('Validações dos campos incorreta');
    }

    const { email, password } = userAuthenticate;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new Error('Usuário não cadastrado');
    }

    if (password && !(await bcrypt.compare(password, user.password))) {
      throw new Error('Senha inválida');
    }

    const { _id, name } = user;

    const profile = await Profile.findOne({ user: _id });

    return {
      user: {
        _id,
        name,
        email,
        profile: {
          _id: profile && profile._id,
        },
      },
      token: generateToken({ id: _id }),
    };
  }
}

export default new AuthenticateService();
