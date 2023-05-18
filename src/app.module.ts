import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotionService } from './notion/notion.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [NotionService],
})
export class AppModule {}
