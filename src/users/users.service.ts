import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/core/models/entities';
import { CreateUserDto } from '@/core/models/user';
import { ServiceError } from '@/core/errors/ServiceError';
import { UserErrors } from './errors/user.errors';
import { Services } from '@/core/enums/services.enum';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const foundUser = await this.usersRepository.findOne({ where: { email } });

    return foundUser;
  }

  async create(payload: CreateUserDto): Promise<User> {
    const foundUser = await this.findByEmail(payload.email);

    if (foundUser) {
      throw new ServiceError({
        message: UserErrors.USER_ALREADY_EXISTS,
        service: Services.USERS_SERVICE,
        params: [payload.email],
      });
    }

    const createdUser = await this.usersRepository.save(payload);

    return createdUser;
  }
}
