/* eslint-disable no-underscore-dangle */
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import Profile from '../models/Profile';
import authConfig from '../config/auth';

export function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: authConfig.expiresIn,
  });
}

class AuthenticateController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .min(6)
          .required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ error: 'Validações dos campos incorreta' });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        return res.status(404).json({ error: 'Usuário não cadastrado' });
      }

      if (password && !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Senha inválida' });
      }

      user.password = undefined;

      const { _id, name } = user;

      const profile = await Profile.findOne({ user: _id });

      return res.json({
        user: {
          _id,
          name,
          email,
          profile: {
            _id: profile._id,
          },
        },
        token: generateToken({ id: _id }),
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new AuthenticateController();
