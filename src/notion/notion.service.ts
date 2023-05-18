import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@notionhq/client';

@Injectable()
export class NotionService {
  private readonly notion: Client;
  private readonly databaseId: string;

  constructor(private readonly configService: ConfigService<Environment>) {
    this.notion = new Client({ auth: this.configService.get('NOTION_TOKEN') });
    this.databaseId = this.configService.get('NOTION_DATABASE_ID');
  }

  async addItem() {
    try {
      const response = await this.notion.pages.create({
        parent: { database_id: this.databaseId },
        properties: {
          Title: {
            title: [
              {
                text: {
                  content: 'First item xd',
                },
              },
            ],
          },
          Person: {
            type: 'rich_text',
            rich_text: [
              {
                text: {
                  content: 'First item xd in other row',
                },
              },
            ],
          },
        },
      });
    } catch (error) {
      console.error(error.body);
    }
  }
}
