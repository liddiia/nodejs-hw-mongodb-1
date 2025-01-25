import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import fs from 'fs/promises';
import User from '../db/models/user.js';
import Session from '../db/models/session.js';
import jwt from 'jsonwebtoken';
import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/users.js';

import { sendEmail } from '../utils/sendMail.js';

import path from 'node:path';

import Handlebars from 'handlebars';

import { SMTP, TEMPLATES_DIR } from '../constants/index.js'; //беремо шлях до шаблонів


import { getEnvVar } from '../utils/getEnvVar.js';


// Generate tokens
const createSessionData = () => ({
  accessToken: randomBytes(30).toString('base64'),
  refreshToken: randomBytes(30).toString('base64'),
  accessTokenValidUntil: Date.now() + accessTokenLifeTime,
  refreshTokenValidUntil: Date.now() + refreshTokenLifeTime,
});

export const register = async (payload) => {
  const { email, password } = payload;

  // Check if user already exists
  const user = await User.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  // Hash password
  const hashPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = await User.create({ ...payload, password: hashPassword });


  return newUser;
};


export const login = async ({ email, password }) => {
  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Email or password invalid');
  }

  // Verify password
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'Email or password invalid');
  }

  // Remove old sessions
  await Session.deleteOne({ userId: user._id });

  // Generate tokens
  const sessionData = createSessionData();

  // Create session & Return tokens to the caller
  return Session.create({
    userId: user._id,
    ...sessionData,
  });
};

export const refreshToken = async (payload) => {
  const session = await Session.findOne({
    _id: payload.sessionId,
    refreshToken: payload.refreshToken,
  });
  if (!session) {
    throw createHttpError(401, 'Session not found!');
  }
  if (Date.now() > session.refreshTokenValidUntil) {
    throw createHttpError(401, 'Refresh token expired');
  }

  await Session.deleteOne({ _id: payload.sessionId });
  // Generate new tokens & Create new session /// userId:
  const sessionData = createSessionData();

  return Session.create({
    userId: session.userId,
    ...sessionData,
  });
};

export const logout = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};

export const requestResetToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    getEnvVar('JWT_SECRET'),
    {
      expiresIn: '15m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = Handlebars.compile(templateSource);
  const html = template({
    name: user.name,
    link: `${getEnvVar('APP_DOMAIN')}/reset-password?token=${resetToken}`,
  });

  await sendEmail({
    from: getEnvVar(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html,
  });
};

export const resetPassword = async ({ token, password }) => {
  let tokenPayload;
  try {
    tokenPayload = jwt.verify(token, getEnvVar('JWT_SECRET'));
  } catch (error) {
    console.log(error);
    throw createHttpError(401, 'Token is expired or invalid.');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.findOneAndUpdate(
    { email: tokenPayload.email, _id: tokenPayload.sub },
    { password: hashedPassword },
  );
  if (!user) {
    throw createHttpError(404, 'User not found!');
  }
  await Session.deleteOne({userId: user._id});
};
export const getUser = (filter) => User.findOne(filter);

export const getSession = (filter) => Session.findOne(filter);
