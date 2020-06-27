import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';

import '../../../database';
import routes from '@shared/infra/routes';
import AppError from '@shared/errors/AppError';

import '@shared/container';

const app = express();

app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  // eslint-disable-next-line no-console
  console.error(err);

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal Server Error' });
});

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
