import express, { Application as ExpressApp } from 'express';
import swaggerUi from 'swagger-ui-express';
import { RouterRegister } from 'src/interfaces/http/RouterRegister';
import { ErrorMiddleware } from 'src/interfaces/http/middlewares/ErrorMiddleware';
import swaggerSpec from 'src/utils/Swagger';
import Logger from 'src/utils/Logger';
import container from 'src/Container'; 

export class Application {
  private app: ExpressApp;
  private logger: Logger;

  constructor() {
    this.app = express();
    this.logger = new Logger();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    const logger = container.resolve('logger');
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    logger.info('Middlewares initialized');
  }

  private initializeRoutes() {
    const logger = container.resolve('logger');
    this.app.get('/', (req, res) => {
      res.send('API is running!');
    });

    const routerRegister = new RouterRegister();
    this.app.use('/api/registration', routerRegister.getRoutes());

    logger.info('Routes initialized');
  }

  private initializeSwagger() {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware.handle);
  }

  public getServer() {
    return this.app;
  }
}
