/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from 'express';
import ProfileService from '../services/ProfileService';

export default class ProfileController {
  async index(req: Request, res: Response) {
    const profiles = await ProfileService.index();
    res.json(profiles);
  }

  async show(req: Request, res: Response) {
    const profile = await ProfileService.show(req.params.id);
    return res.json(profile);
  }
}
