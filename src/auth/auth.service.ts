import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // register = async (userDto: CreateUserDto) => {
  //   const user = this.userService.createUser(userDto);
  //   const token = this.userService.create;
  // };

  private _createToken = async (email, refresh = true) => {
    const accessToken = this.jwtService.sign({ email });
    if (refresh) {
    }
  };
}
