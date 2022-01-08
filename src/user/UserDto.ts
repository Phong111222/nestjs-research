import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRoles } from 'src/role/roles.decorator';

export class UserCreateDto {
  @IsNotEmpty({ message: 'Firstname is required' })
  @MinLength(2, { message: 'Firstname must have at least 2 characters' })
  firstname: string;

  @IsNotEmpty({ message: 'Lastname is required' })
  @MinLength(2, { message: 'Lastname must have at least 2 characters' })
  lastname: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must have at least 6 characters' })
  password: string;
  @IsEnum(UserRoles, {
    message: 'Invalid role',
  })
  role: string;
}

export class UserInfoDto {
  constructor(
    public id: string | number,
    public firstname: string,
    public lastname: string,
    public email: string,
    public role: string,
  ) {}
}

export class UserLoginDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must have at least 6 characters' })
  password: string;
}

export class UserLoginResposneDto {
  constructor(public user: UserInfoDto, public jwt: string) {}
}
