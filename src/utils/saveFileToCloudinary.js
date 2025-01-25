import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';

import { getEnvVar } from './getEnvVar.js';
const cloud_name = getEnvVar('CLOUDINARY_CLOUD_NAME');

const api_key = getEnvVar('CLOUDINARY_API_KAY');

const api_secret = getEnvVar('CLOUDINARY_API_SECRET');

cloudinary.v2.config({
  secure: true,
  cloud_name,
  api_key,
  api_secret,
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
