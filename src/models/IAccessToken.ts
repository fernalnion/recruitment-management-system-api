import { Request } from 'express';
import { User } from 'src/entities/user.entity';

export interface JwtPayload {
  username: string;
  sub: number;
}

export interface IAccessToken {
  access_token: string;
}

export interface IUserIdentityPayload {
  username: string;
  userId: number;
}

export interface LoginRequest extends Request {
  user: User;
}
