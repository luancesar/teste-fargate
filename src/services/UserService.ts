import bcrypt from 'bcryptjs';
import User from '../models/User';
import ProfileService from './ProfileService';
import { generateToken } from './AuthenticateService';
import AppError from '../errors/AppError';

interface IUser {
  name: string;
  email: string;
  password: string;
  oldPassword: string;
  confirmationPassword: string;
}

class UserService {
  async index() {
    const users = await User.find();

    return users;
  }

  async show(id: string) {
    const user = await User.findById(id);

    if (!user) {
      throw new AppError('Usuário não cadastrado', 401);
    }

    const profile = await ProfileService.show(id);

    return {
      user: {
        ...user,
        profile: {
          _id: profile && profile.id,
        },
      },
    };
  }

  async store(user: IUser) {
    const existsUser = await User.findOne({ email: user.email });

    if (existsUser) {
      throw new AppError('Já existe uma conta vinculada a este e-mail', 401);
    }

    const { _id, name, email } = await User.create(user);

    const profile = await ProfileService.show(_id);

    return {
      user: {
        _id,
        name,
        email,
      },
      profile: {
        _id: profile && profile.id,
      },
      token: generateToken({ id: _id }),
    };
  }

  async update(id: string, userUpdate: IUser) {
    const { oldPassword, name, password } = userUpdate;

    const user = await User.findById(id).select('+password');

    if (!user) {
      throw new AppError('Usuário não cadastrado');
    }

    if (
      user &&
      oldPassword &&
      !(await bcrypt.compare(oldPassword, user.password))
    ) {
      throw new AppError('Senhas não correspondem');
    }

    await User.findByIdAndUpdate(id, {
      name,
      password,
    });
  }

  async delete(id: string) {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      throw new AppError('Usuário não cadastrado');
    }
  }
}

export default new UserService();
