import { Readable } from 'stream';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction
} from 'express';

export type Payload = {
  user?: any;
  files?: any;
};

export type Request = ExpressRequest & Payload;
export type Response = ExpressResponse;
export type NextFunction = ExpressNextFunction;

export type Pagination<Type> = {
  data: Type[];
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
};

export type PagenationProps = {
  page: number;
  pageSize: number;
};

export type SidebarItem = {
  icon: string;
  path?: string;
  title: string;
  children?: SidebarItem[];
};

export type File = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  stream: Readable;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
};

export type SendType = {
  res: Response;
  data?: any;
  message?: string;
  code?: number;
};
