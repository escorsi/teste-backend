import Joi from 'joi';

export const addressSchema = Joi.object({
  postalCode: Joi.string()
    .pattern(/^\d{8}$/)
    .required()
    .messages({
      'string.pattern.base': 'Postal code must be exactly 8 digits.',
      'any.required': 'Postal code is required.',
    }),
  street: Joi.string().required().messages({
    'any.required': 'Street is required.',
  }),
  number: Joi.string().required().messages({
    'any.required': 'Number is required.',
  }),
  complement: Joi.string().optional(),
  city: Joi.string().required().messages({
    'any.required': 'City is required.',
  }),
  district: Joi.string().required().messages({
    'any.required': 'District is required.',
  }),
  state: Joi.string().length(2).required().messages({
    'string.length': 'State must be exactly 2 characters.',
    'any.required': 'State is required.',
  }),
});

export const registrationSchema = Joi.object({
  personType: Joi.string().valid('individual', 'company').required().messages({
    'any.only': 'Person type must be either "individual" or "company".',
    'any.required': 'Person type is required.',
  }),
  cpf: Joi.when('personType', {
    is: 'individual',
    then: Joi.string()
      .pattern(/^\d{11}$/)
      .required()
      .messages({
        'string.pattern.base': 'CPF must be exactly 11 digits.',
        'any.required': 'CPF is required for individuals.',
      }),
    otherwise: Joi.forbidden(),
  }),
  cnpj: Joi.when('personType', {
    is: 'company',
    then: Joi.string()
      .pattern(/^\d{14}$/)
      .required()
      .messages({
        'string.pattern.base': 'CNPJ must be exactly 14 digits.',
        'any.required': 'CNPJ is required for companies.',
      }),
    otherwise: Joi.forbidden(),
  }),
  responsibleCpf: Joi.when('personType', {
    is: 'company',
    then: Joi.string()
      .pattern(/^\d{11}$/)
      .required()
      .messages({
        'string.pattern.base': 'Responsible CPF must be exactly 11 digits.',
        'any.required': 'Responsible CPF is required for companies.',
      }),
    otherwise: Joi.forbidden(),
  }),
  name: Joi.string().min(2).max(255).required().messages({
    'string.min': 'Name must be at least 2 characters.',
    'string.max': 'Name cannot be longer than 255 characters.',
    'any.required': 'Name is required.',
  }),
  mobile: Joi.string()
    .pattern(/^\d{10,11}$/)
    .required()
    .messages({
      'string.pattern.base': 'Mobile must be 10 or 11 digits.',
      'any.required': 'Mobile number is required.',
    }),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Phone must be exactly 10 digits.',
    }),
  email: Joi.string().email().required().messages({
    'string.email': 'Must be a valid email address.',
    'any.required': 'Email is required.',
  }),
  confirmEmail: Joi.string().email().required().valid(Joi.ref('email')).messages({
    'any.only': 'Confirmation email must match the email.',
    'string.email': 'Must be a valid email address.',
    'any.required': 'Confirmation email is required.',
  }),
  address: addressSchema.required().messages({
    'any.required': 'Address is required.',
  }),
  acceptedTerms: Joi.boolean().valid(true).required().messages({
    'any.only': 'You must accept the terms of use to continue.',
    'any.required': 'Terms of use acceptance is required.',
  }),
});
