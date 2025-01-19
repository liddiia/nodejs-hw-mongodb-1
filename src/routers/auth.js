import { Router } from 'express';
import * as authCController from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validationBody } from '../middelwares/validationBody.js';
import { authLoginSchema, authRegisterSchema, requestResetEmailSchema } from '../validation/auth.js';
// import { authenticate } from '../middelwares/authenticate.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validationBody(authRegisterSchema),
  ctrlWrapper(authCController.registerController),
);
authRouter.post(
  '/login',
  validationBody(authLoginSchema),
  ctrlWrapper(authCController.loginController),
);

authRouter.post(
  '/refresh', ctrlWrapper(authCController.refreshTokenController));

  authRouter.post(
    '/logout', ctrlWrapper(authCController.logoutController));

   authRouter.post(
      '/request-reset-email',
      validationBody(requestResetEmailSchema),
      ctrlWrapper(authCController.requestResetEmailController),
    );



export default authRouter;
