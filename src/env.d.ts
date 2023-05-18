/* 
  Strongly types environment variables for accessing by the ConfigService
  Should be synced with the .env and .env.example files in order to keep consistency over the application environment variables
*/

interface Environment {
  NOTION_TOKEN: string;
  NOTION_DATABASE_ID: string;
  NODE_ENV: 'development' | 'production';
}
