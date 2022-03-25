import * as express from 'express';
import * as cors from 'cors';
import clubsController from './controllers/clubsController';
import matchsController from './controllers/matchsController';
import { login, validate } from './controllers/loginController';
import validation from './middlewares/validations';
import checkToken from './auth/checkToken';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(cors());
    this.app.post('/login', validation.validLogin, login);
    this.app.get('/login/validate', validate);
    this.app.get('/clubs', clubsController.getAllClubs);
    this.app.get('/clubs/:id', clubsController.getClubById);
    this.app.get('/matchs', matchsController.getMatchs);
    this.app.post('/matchs', checkToken, matchsController.saveMatch);
    this.app.patch('/matchs/:id/finish', checkToken, matchsController.finishMatch);
    this.app.patch('/matchs/:id', checkToken, matchsController.editMatch);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
