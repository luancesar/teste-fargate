import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';
import AppError from './AppError';

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ValidationError) {
    const errors: ValidationErrors = {};

    error.inner.forEach(err => {
      errors[err.path] = err.errors;
    });
    return response.status(400).json({ message: 'Validation fails', errors });
  }

  if (error instanceof AppError) {
    return response.status(error.statusCode).json(error.message);
  }
};

export const errors = {
  cpf: {
    message: 'Validation fails',
    errors: {
      cpf: ['Invalid CPF'],
    },
  },
  proposal: {
    message: 'Validation fails',
    errors: {
      cpf: ['This Proposal is already registered'],
    },
  },
  cellPhone: {
    message: 'Validation fails',
    errors: {
      cpf: ['Invalid Cellphone Number'],
    },
  },
  SCR: {
    message: 'Validation fails',
    errors: {
      SCR: ['this Scr is already registered'],
    },
  },
};

export default errorHandler;
