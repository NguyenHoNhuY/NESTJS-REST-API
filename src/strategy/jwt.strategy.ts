import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  validate = async ({ email, password }) => {
    const user = await this.userService.findByEmail(email);
    if (!user || user.password !== password) {
      throw new HttpException('Invalid token !', HttpStatus.UNAUTHORIZED);
    }
    return user;
  };
}
