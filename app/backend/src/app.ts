import * as express from 'express';
import clubsController from './controllers/clubsController';
import { login, validate } from './controllers/loginController';
import validation from './middlewares/validations';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.config();
    // ...
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
    this.app.post('/login', validation.validLogin, login);
    this.app.get('/login/validate', validate);
    this.app.get('/clubs', clubsController.getAllClubs);
    this.app.get('/clubs/:id', clubsController.getClubById);
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
