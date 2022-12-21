import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  //Reverse a String (đảo ngược chuỗi)
  private _reverse(str: string) {
    return str.split('').reverse().join('');
  }

  createUser = async (userDto: CreateUserDto) => {
    //hash password by bcrypt
    userDto.password = await bcrypt.hash(userDto.password, 10);

    //check exists
    const isUserInDb = await this.userRepository.findOneBy({
      email: userDto.email,
    });

    if (isUserInDb) {
      throw new HttpException('User already exists !', HttpStatus.BAD_REQUEST);
    }
    return await this.userRepository.save({ ...userDto });
  };

  findByLogin = async (loginUserDto: LoginUserDto) => {
    const { email, password } = loginUserDto;

    //check exists
    const user = await this.userRepository.findOneBy({
      email: email,
    });

    if (!user) {
      throw new HttpException('User not found !', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordDone = await bcrypt.compare(password, user.password);

    if (!isPasswordDone) {
      throw new HttpException('Invalid credential !', HttpStatus.UNAUTHORIZED);
    }

    return user;
  };

  findByEmail = async (email) => {
    return await this.userRepository.findOneBy({ email: email });
  };

  update = async (email: string, newRefreshToken) => {
    if (newRefreshToken) {
      newRefreshToken = await bcrypt.hash(this._reverse(newRefreshToken), 10);
    }
    const user = await this.userRepository.findOneBy({
      email: email,
    });

    return await this.userRepository.save({
      ...user,
      refreshToken: newRefreshToken,
    });
  };

  getUserByRefreshToken = async (email: string, refreshToken) => {
    const user: User = await this.findByEmail(email);

    if (!user) {
      throw new HttpException('Invalid token !', HttpStatus.UNAUTHORIZED);
    }
    const isTokenTrue = bcrypt.compare(refreshToken, user.refreshToken);
    if (!isTokenTrue) {
      throw new HttpException('Invalid credential !', HttpStatus.UNAUTHORIZED);
    }

    return user;
  };
}
