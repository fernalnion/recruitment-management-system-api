import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  IAccessTokenPayload,
  IUserIdentityPayload,
} from 'src/models/IAccessToken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // Change this to your JWT secret
    });
  }

  async validate(payload: IAccessTokenPayload): Promise<IUserIdentityPayload> {
    return { userId: payload.sub, username: payload.username };
  }
}
