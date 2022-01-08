import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto, UserInfoDto, UserLoginDto } from 'src/user/UserDto';
import { Connection, Repository } from 'typeorm';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async CreateUser(userCreateDto: UserCreateDto): Promise<UserInfoDto> {
    const { password, ...rest } = userCreateDto;

    const existedUser = await this.userRepository.findOne({
      email: rest.email,
    });

    if (existedUser) {
      throw new HttpException(
        { message: 'Email has already been used', status: 400 },
        400,
      );
    }

    const userEntity = this.userRepository.create(userCreateDto);

    const hashPassword = await bcrypt.hash(password, 5);

    const userHashPassword = this.userRepository.create({
      ...userEntity,
      password: hashPassword,
    });
    const newUser = await this.userRepository.save(userHashPassword);

    return new UserInfoDto(
      newUser.id,
      newUser.firstname,
      newUser.lastname,
      newUser.email,
      newUser.role,
    );
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      return new NotFoundException({
        message: 'User with given Id not found ',
        status: 404,
      });
    }
    return new UserInfoDto(
      user.id,
      user.firstname,
      user.lastname,
      user.email,
      user.role,
    );
  }

  findUser(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }
}
