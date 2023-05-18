import { Controller, Get } from '@nestjs/common';
import { NotionService } from './notion.service';

@Controller('notion')
export class NotionController {
  constructor(private readonly notionService: NotionService) {}

  @Get('/add-item')
  async addItem() {
    return await this.notionService.addItem();
  }
}
