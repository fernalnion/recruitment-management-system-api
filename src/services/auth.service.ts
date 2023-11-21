import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/users/user.service';
import { UserEntity } from 'src/entities/user.entity';
import { IAccessTokenPayload } from 'src/models/IAccessToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this._userService.findByusername(username);
    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  async login(user: UserEntity): Promise<{ access_token: string }> {
    const payload: IAccessTokenPayload = {
      username: user.username,
      sub: user.id,
    };
    return {
      access_token: this._jwtService.sign(payload, { expiresIn: '5m' }),
    };
  }
}
