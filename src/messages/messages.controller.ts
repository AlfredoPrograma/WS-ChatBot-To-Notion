import { SuscribeMessagesWeebhokQueryParams } from '@/core/interfaces/messages';
import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  private readonly suscriberToken: string;

  constructor(
    private readonly messagesService: MessagesService,
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
}
