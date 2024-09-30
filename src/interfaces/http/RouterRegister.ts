import { Router } from 'express';
import UserRoutes from './presentation/UserRoutes';

export default class RouterRegister {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const routes = [new UserRoutes()];

    routes.forEach(route => {
      this.router.use(route.getRoutes());
    });
  }

  public getRoutes() {
    return this.router;
  }
}
