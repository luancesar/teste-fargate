/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Profile from '../models/Profile';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

export function generateToken(params: { id: string }): string {
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
    const { email, password } = userAuthenticate;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new AppError('Usuário não cadastrado');
    }

    if (password && !(await bcrypt.compare(password, user.password))) {
      throw new AppError('Senha inválida');
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
