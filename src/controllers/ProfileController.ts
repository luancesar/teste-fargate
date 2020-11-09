import ProfileService from '../services/ProfileService';
import {Request, Response} from 'express';

export default class ProfileController {
  async index(req: Request, res: Response) {
    try {

      const profiles = await ProfileService.index();
      res.json(profiles);

    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async show(req: Request, res: Response) {
    try {

      const profile = await ProfileService.show(req.params.id);
      return res.json(profile);

    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
