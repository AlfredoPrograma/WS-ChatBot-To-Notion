import { CreateUserDto, User } from '@/core/models/user';
import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { EncryptService } from './encrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly encryptService: EncryptService,
    private readonly usersService: UsersService,
  ) {}

  async signUp(payload: CreateUserDto): Promise<User> {
    const encryptedPassword = await this.encryptService.encryptPassword(
      payload.password,
    );

    const newUser = await this.usersService.create({
      ...payload,
      password: encryptedPassword,
    });

    return newUser;
  }
}
