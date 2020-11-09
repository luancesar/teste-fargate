
import User from '../models/User';
import ProfileService from '../services/ProfileService';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import { generateToken } from '../services/AuthenticateService';
import { isEmpty } from '../helpers/funcoes';

interface IUser {
  name: string,
  email: string,
  password: string,
  oldPassword: string,
  confirmationPassword: string
}

class UserService {

  async index() {

    const users = await  User.find();

    return users;
  }

  async show(id:string) {
    const user = await User.findById(id);

    if (!user) {
      throw new Error('Usuário não cadastrado');
    }

    const profile = await ProfileService.show(id);

    return {
      user: {
        // ...user._doc,
        profile: {
          _id: profile && profile._id,
        },
      }
    }
  }

  async store(user : IUser) {

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(user))) {
      throw new Error('Validações dos campos incorreta');
    }

    const existsUser = await User.findOne({ email: user.email });

    if (existsUser) {
      throw new Error('Já existe uma conta vinculada a este e-mail');
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
        _id: profile && profile._id,
      },
      token: generateToken({ id: _id }),
    };
  }

  async update(id: string, userUpdate:IUser){

    const schema = Yup.object().shape({
      name: Yup.string(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword: string, field: Yup.ObjectSchema) =>
          oldPassword ? field.required() : field
        ),
      confirmationPassword: Yup.string().min(6).when(
        'password',
        (password: string, field: Yup.ObjectSchema) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(userUpdate))) {
      throw new Error('Validações dos campos incorreta');
    }

    const { oldPassword, name, password } = userUpdate;

    const user = await User.findById(id).select('+password');

    if (!user) {
      throw new Error('Usuário não cadastrado');
    }

    if (user && oldPassword && !(await bcrypt.compare(oldPassword, user.password))) {
      throw new Error('Senhas não correspondem');
    }

    await User.findByIdAndUpdate(id, {
      name,
      password,
    });
  }

  async delete(id:string) {

      const user = await User.findByIdAndDelete(id);

      if (!user) {
        throw new Error('Usuário não cadastrado');
      }
  }
}

export default new UserService();
