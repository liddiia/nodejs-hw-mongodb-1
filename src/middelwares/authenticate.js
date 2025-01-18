import createHttpError from 'http-errors';
import { getSession, getUser } from '../services/auth.js';

export const authenticate = async (req, res, next) => {
  // const {authorization} = req.header; -можливий спосіб дістати заголовок

  const authHeader = req.get('Authorization'); // 2 -й спосіб дістати заголовок
  if (!authHeader) {
    return next(createHttpError(401, 'Authorization header not found'));
  }
  const [bearer, accessToken] = authHeader.split(" ");
  if (bearer !== 'Bearer') {
    return next(createHttpError(401, 'Header must be Bearer type'));
  }
//yt ghj[jlbnm!! lfks]
  const session = await getSession({accessToken});
  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  if (Date.now() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token expired'));
  }
  const user = await getUser({ _id: session.userId });
  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }

  req.user = user; //додаємо інформацію про юзера для подальшої ідентифікації

  next();
};
