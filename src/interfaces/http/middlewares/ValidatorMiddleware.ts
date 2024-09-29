import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const registrationSchema = Joi.object({
  personType: Joi.string().valid('individual', 'company').required(),
  cnpj: Joi.when('personType', {
    is: 'company',
    then: Joi.string().regex(/^\d{14}$/).required(),
    otherwise: Joi.optional(),
  }),
  responsibleCpf: Joi.string().regex(/^\d{11}$/).required(),
  name: Joi.string().min(2).max(255).required(),
  mobile: Joi.string().regex(/^\d{10,11}$/).required(),
  phone: Joi.string().regex(/^\d{10}$/).optional(),
  email: Joi.string().email().required(),
  address: Joi.object({
    postalCode: Joi.string().regex(/^\d{8}$/).required(),
    street: Joi.string().required(),
    number: Joi.string().required(),
    complement: Joi.string().optional(),
    city: Joi.string().required(),
    district: Joi.string().required(),
    state: Joi.string().length(2).required(),
  }).required(),
  acceptedTerms: Joi.boolean().valid(true).required()
});

export function validateRegistration(req: Request, res: Response, next: NextFunction) {
  const { error } = registrationSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: 'Validation error',
      details: error.details.map(err => err.message),
    });
  }

  next();
}
