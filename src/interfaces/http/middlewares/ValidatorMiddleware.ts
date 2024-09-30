import { Request, Response, NextFunction } from 'express';
import { registrationSchema } from 'src/interfaces/http/presentation/UserSchema';

export default function validateRegistration(req: Request, res: Response, next: NextFunction) {
  const { error } = registrationSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: 'Validation error',
      details: error.details.map(err => err.message),
    });
  }

  return next();
}
