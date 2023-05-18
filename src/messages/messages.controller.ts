import { SuscribeMessagesWeebhokQueryParams } from '@/core/interfaces/messages';
import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
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
  suscribe(@Query() queryParams: SuscribeMessagesWeebhokQueryParams) {
    if (
      queryParams['hub.mode'] === 'suscribe' &&
      queryParams['hub.verify_token'] === this.suscriberToken
    ) {
      return queryParams['hub.challenge'];
    }

    throw new BadRequestException();
  }
}