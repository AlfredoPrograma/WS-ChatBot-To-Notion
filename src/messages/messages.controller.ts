import { SuscribeMessagesWeebhokQueryParams } from '@/core/interfaces/messages';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, map, tap } from 'rxjs';

@Controller('messages')
export class MessagesController {
  private readonly suscriberToken: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<Environment>,
  ) {
    this.suscriberToken = this.configService.get('SUSCRIBER_TOKEN');
  }

  @Get('/webhook')
  suscribe(
    @Query() queryParams: SuscribeMessagesWeebhokQueryParams,
    @Res() res: Response,
  ) {
    if (
      queryParams['hub.mode'] === 'subscribe' &&
      queryParams['hub.verify_token'] === this.suscriberToken
    ) {
      res
        .setHeader('Content-Type', 'text/plain')
        .send(queryParams['hub.challenge']);
    }

    throw new NotFoundException();
  }

  @Post('/webhook')
  @HttpCode(HttpStatus.NO_CONTENT)
  async receiveMessage(@Body() body: any): Promise<any> {
    console.log('Sending');
    return this.httpService
      .post('http://localhost:3001/api/v1/messages', body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(map(() => console.log('Sent')))
      .pipe(
        catchError(() => {
          throw new ForbiddenException();
        }),
      );
  }
}
