import Profile from '../models/Profile';
import AppError from '../errors/AppError';

class ProfileService {
  async index() {
    const profiles = await Profile.find();

    return profiles;
  }

  async show(id: string) {
    const profile = await Profile.findById(id).populate('user');
    if (!profile) {
      throw new AppError('Perfil não encontrado');
    }
    return profile;
  }
}

export default new ProfileService();
