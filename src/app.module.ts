import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotionService } from './notion/notion.service';
import { NotionController } from './notion/notion.controller';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [ConfigModule.forRoot(), MessagesModule],
  controllers: [NotionController],
  providers: [NotionService],
})
export class AppModule {}
