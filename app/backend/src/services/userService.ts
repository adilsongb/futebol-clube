import * as fs from 'fs';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import Users from '../database/models/User';

type UserLogin = { email: string, password: string };

const getUser = async ({ email, password }: UserLogin) => {
  const user = await Users.findOne({ where: { email } });

  if (!user) { return { status: 401, message: 'Incorrect email or password' }; }

  const verifyCrypt = await bcryptjs.compare(password, user.password);

  if (!verifyCrypt) { return { status: 401, message: 'Incorrect email or password' }; }

  const secretKey = await fs.readFileSync('jwt.evaluation.key', 'utf8').trim();
  const token = jwt.sign({ email }, secretKey);

  const userLoginResponse = {
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    },
    token,
  };

  return { status: 200, data: userLoginResponse };
};

const hello2 = () => console.log(1);

export { getUser, hello2 };
