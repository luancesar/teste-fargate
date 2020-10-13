import Profile from '../models/Profile';
import { isEmpty } from '../helpers/funcoes';

class ProfileController {
  async index(req, res) {
    try {
      const profiles = await Profile.find().populate('user');
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async show(req, res) {
    try {
      const profile = await Profile.findById(req.params.id).populate('user');

      if (isEmpty(profile)) {
        return res.status(404).json({ error: 'Perfil não encontrado' });
      }

      return res.json(profile);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new ProfileController();
