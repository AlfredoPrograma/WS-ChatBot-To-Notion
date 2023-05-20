import { SuscribeMessagesWeebhokQueryParams } from '@/core/interfaces/webhooks';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('webhooks')
export class MessagesController {
  private readonly suscriberToken: string;

  constructor(private readonly configService: ConfigService<Environment>) {
    this.suscriberToken = this.configService.get('SUSCRIBER_TOKEN');
  }

  @Get('/')
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

    throw new BadRequestException();
  }

  @Post('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  async receiveMessage(@Body() body: unknown) {
    console.log(body);
  }
}
