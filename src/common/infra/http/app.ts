import 'reflect-metadata';
import 'dotenv/config';

import 'express-async-errors';

import '@common/container';

import swaggerUi from 'swagger-ui-express';
import express from 'express';
import figlet from 'figlet';
import chalk from 'chalk';
import cors from 'cors';
import http from 'http';

import GlobalExceptionHandler from '@common/infra/http/middlewares/GlobalExceptionHandler';
import SwaggerOptions from '@docs/index';
import InitDatabase from '@common/infra/typeorm';
import Routes from '@common/infra/http/routes';

class App {

  public readonly port: number = +process.env.API_PORT || 5555;

  private app: express.Application;

  public server: http.Server;

  private title: string;

  private info: string;

  constructor() {
    this.title = chalk.magentaBright(figlet.textSync('FaleMais'));
    this.info = chalk.bgGreenBright(`Service running at port ${this.port}.`);
    this.app = express();
    this.server = http.createServer(this.app);
    this.database();
    this.middlewares();
    this.routes();
    this.start();
  }

  private database() {
    InitDatabase();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use('/api', Routes);
    this.app.use(GlobalExceptionHandler);
    this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(SwaggerOptions, {
      swaggerOptions: { docExpansion: 'none' },
      customSiteTitle: 'FaleMais Swagger Documentation',
    }));
  }

  public start(): void {
    this.server.listen((this.port), () => {
      console.log(`${this.title}`);
      console.log(`${this.info}`);
    });
  }

}

export default new App();
