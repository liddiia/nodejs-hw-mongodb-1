import path from 'node:path';

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

//resolve підставляє на початок шдяху шлях до проекту

export const TEMPLATES_DIR = path.resolve('src', 'templates');

// export const TEMP_UPLOAD_DIR =path.resolve("temp");//шлях до тимчасової папки для зберігання файлів

// export const UPLOADS_DIR= path.resolve("uploads");//шлях до папки для остаточного зберігання файлів

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
