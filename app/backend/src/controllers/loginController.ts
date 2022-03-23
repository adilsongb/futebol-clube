import { Request, Response } from 'express';
import * as UserServices from '../services/userService';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { status, message, data } = await UserServices.getUser({ email, password });

  if (status >= 400) {
    return res.status(status).json({ message });
  }
  return res.status(200).json(data);
};

const hello = () => console.log(2);

export { login, hello };
