import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotionService } from './notion/notion.service';
import { NotionController } from './notion/notion.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [NotionController],
  providers: [NotionService],
})
export class AppModule {}
