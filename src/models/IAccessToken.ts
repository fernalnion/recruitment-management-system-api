import { Request } from 'express';
import { UserEntity } from 'src/entities/user.entity';

export interface IAccessTokenPayload {
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

export interface ILogin {
  username: string;
  password: string;
}

export interface LoginRequest extends Request {
  user: UserEntity;
}
