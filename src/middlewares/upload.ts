import path from 'path';
import multer from 'multer';
import { DIR } from '../conf';
import { File, Request } from '../types';

export const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: File,
    callback: (error: Error | null, destination: string) => void
  ): void => {
    callback(null, path.join(`${DIR}/client/upload/`));
  },
  filename: (
    req: Request,
    file: File,
    callback: (error: Error | null, filename: string) => void
  ): void => {
    const ext = path.extname(file.originalname);
    callback(null, `${Date.now()}${ext}`);
  }
});

export const fileFilter = (
  req: Request,
  file: File,
  callback: (error: Error | null, type?: boolean) => void
): void => {
  const ext = path.extname(file.originalname);
  const fileTypes = ['.png', '.jpg', '.gif', '.jpeg', '.jfif', '.webp', '.svg'];
  if (fileTypes.indexOf(ext) === -1) {
    return callback(new Error('Only images are allowed'));
  }
  callback(null, true);
};

export const limits = { fileSize: 1024 * 1024 };
