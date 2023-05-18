import { SuscribeMessagesWeebhokQueryParams } from '@/core/interfaces/messages';
import {
  Body,
  Controller,
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
import { map, tap } from 'rxjs';

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
  async receiveMessage(@Body() body: any) {
    console.log('METADATA');
    console.log(body.entry[0].changes[0].value.metadata);

    console.log('CONTACTS');
    console.log(body.entry[0].changes[0].value.contacts);

    console.log('MESSAGES');
    console.log(body.entry[0].changes[0].value.messages);

    this.httpService
      .post('http://localhost:3001/api/v1/messages', body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(tap((response) => console.log(response)));
  }
}
