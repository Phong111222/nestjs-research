import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  UserInfoDto,
  UserLoginDto,
  UserLoginResposneDto,
} from 'src/user/UserDto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthSerive {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    userLoginDto: UserLoginDto,
  ): Promise<UserLoginResposneDto> {
    const { email, password } = userLoginDto;

    const user = await this.userService.findUser(email);

    if (!user) {
      return null;
    }

    const checkpassword = await bcrypt.compare(password, user.password);
    if (!checkpassword) {
      return null;
    }

    const userDto = new UserInfoDto(
      user.id,
      user.firstname,
      user.lastname,
      user.email,
      user.role,
    );
    const token = this.jwtService.sign({ ...userDto });

    return new UserLoginResposneDto(userDto, token);
  }
}
