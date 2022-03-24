import { Request, Response } from 'express';
import clubService from '../services/clubService';

const getAllClubs = async (req: Request, res: Response) => {
  const { status, data } = await clubService.getAll();

  return res.status(status).json(data);
};

const getClubById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, data } = await clubService.getById(id);

  return res.status(status).json(data);
};

export default { getAllClubs, getClubById };
