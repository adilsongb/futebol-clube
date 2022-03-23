import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /login (POST)', () => {
  describe('Requisição feita com sucesso com usuário válido', () => {
    const user = {
      email: 'user@user.com',
      password: 'super_user',
    }
  
    let response: Response;

    it('', () => {

    })
  });
});
