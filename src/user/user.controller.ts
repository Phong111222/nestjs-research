import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import { UserCreateDto, UserInfoDto } from 'src/user/UserDto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  createUser(@Body() userCreateDto: UserCreateDto): Promise<UserInfoDto> {
    return this.userService.CreateUser(userCreateDto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
