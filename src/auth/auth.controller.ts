import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';

import { ErrorHandlers } from '@/core/errors/types';
import { CreateUserDto } from '@/core/models/user';

import { AuthService } from './auth.service';
import { UserErrors } from '@/users/errors/user.errors';

type ControlledErrorKeys = UserErrors.USER_ALREADY_EXISTS;
@Controller('auth')
export class AuthController {
  private readonly controlledErrors: ErrorHandlers<ControlledErrorKeys> = {
    [UserErrors.USER_ALREADY_EXISTS]: (e: Error) => {
      throw new ConflictException(e.message);
    },
  };

  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() payload: CreateUserDto) {
    try {
      return await this.authService.signUp(payload);
    } catch (error) {
      this.controlledErrors[error.message]?.(error);

      throw new InternalServerErrorException();
    }
  }
}
