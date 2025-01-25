import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
//import { logger } from "./middelwares/logger.js";
import { notFoundHandler } from './middelwares/notFoundHandler.js';

import contactsRouter from './routers/contacts-routers.js';
import { errorHandler } from './middelwares/errorHandler.js';
import authRouter from './routers/auth.js';

import { getEnvVar } from './utils/getEnvVar.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json()); //відповідає за обробку запиту в форматі json

  app.use(express.static("uploads")); //дозволяє віддавати файли з папки uploads
  // app.use(logger);
  app.use(cookieParser());

  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);
  const port = Number(getEnvVar('PORT', 3000));
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
