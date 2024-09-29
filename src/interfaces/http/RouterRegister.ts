import { Router } from 'express';
import { UserRoutes } from './presentation/UserRoutes';

export class RouterRegister {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const userRoutes = new UserRoutes();
    this.router.use(userRoutes.getRoutes());
  }

  public getRoutes() {
    return this.router;
  }
}
