export interface JwtPayload {
  username: string;
  sub: string;
}

export interface IAccessToken {
  access_token: string;
}

export interface IUserIdentityPayload {
  userId: string;
  username: string;
}
