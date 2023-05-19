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
import { catchError, map } from 'rxjs';

@Controller('messages')
export class MessagesController {
  private readonly suscriberToken: string;
  private readonly wsToNotionApiUrl: string;
  private readonly messages: unknown[] = [];

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<Environment>,
  ) {
    this.suscriberToken = this.configService.get('SUSCRIBER_TOKEN');
    this.wsToNotionApiUrl = this.configService.get('WS_TO_NOTION_API_URL');
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
  async receiveMessage(@Body() body: unknown): Promise<unknown> {
    console.info('Sending message');

    return this.httpService
      .post(this.wsToNotionApiUrl, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        map(() => {
          this.messages.push(body);

          console.info('Message sent');
          return;
        }),
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException();
        }),
      );
  }

  @Get('/list')
  retrieveMessages(): unknown[] {
    return this.messages;
  }
}
