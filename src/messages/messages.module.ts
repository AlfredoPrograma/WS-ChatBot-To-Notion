import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, ConfigService],
})
export class MessagesModule {}
