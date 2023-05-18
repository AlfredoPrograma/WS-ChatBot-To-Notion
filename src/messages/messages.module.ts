import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [MessagesController],
  providers: [ConfigService],
})
export class MessagesModule {}
