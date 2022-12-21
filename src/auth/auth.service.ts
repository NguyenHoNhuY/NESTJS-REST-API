import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from './../user/dto/user.dto';
import { User } from './../user/interfaces/user.interface';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private _createToken = async (
    email: string,
    password: string,
    refresh = true,
  ) => {
    const accessToken = this.jwtService.sign({ email, password });

    if (refresh) {
      const refreshToken = this.jwtService.sign(
        { email, password },
        {
          secret: process.env.SECRET_KEY_REFRESH,
          expiresIn: process.env.EXPIRES_IN_REFRESH,
        },
      );

      await this.userService.update(email, refreshToken);

      return {
        expireIn: process.env.EXPIRES_IN,
        accessToken,
        refreshToken,
        expiresInRefresh: process.env.EXPIRES_IN_REFRESH,
      };
    } else {
      return {
        expireIn: process.env.EXPIRES_IN,
        accessToken,
      };
    }
  };

  register = async (userDto: CreateUserDto) => {
    const user = await this.userService.createUser(userDto);

    const token = await this._createToken(userDto.email, userDto.password);
    return { email: user.email, ...token };
  };

  login = async (loginUserDto: LoginUserDto) => {
    const user = await this.userService.findByLogin(loginUserDto);

    const token = await this._createToken(
      loginUserDto.email,
      loginUserDto.password,
    );

    return {
      email: user.email,
      ...token,
    };
  };

  logout = async (user: User) => {
    await this.userService.update(user.email, null);
  };

  validateUser = async (email: string, password: string) => {
    const user = await this.userService.findByEmail(email);
    if (!user || user.password !== password) {
      throw new HttpException('Invalid token !', HttpStatus.UNAUTHORIZED);
    }
    return user;
  };

  refresh = async (refreshToken) => {
    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: process.env.SECRET_KEY_REFRESH,
      });
      const user = await this.userService.getUserByRefreshToken(
        payload.email,
        refreshToken,
      );
      const token = await this._createToken(user.email, user.password, false);
      return { email: user.email, ...token };
    } catch {
      throw new HttpException('Invalid token !', HttpStatus.UNAUTHORIZED);
    }
  };
}
