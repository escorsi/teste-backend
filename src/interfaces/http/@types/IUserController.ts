import { Request, Response } from 'express';

export default interface IUserController {
  createUser(req: Request, res: Response): Promise<void>;
}
