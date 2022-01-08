import { Controller, Post, UseGuards } from '@nestjs/common';

import { UserLoginDto } from 'src/user/UserDto';
import { Login } from './auth.decorator';
import { LocalAuth } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuth)
  @Post('login')
  login(@Login() userLoginDto: UserLoginDto) {
    return userLoginDto;
  }
}
