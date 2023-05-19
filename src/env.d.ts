/* 
  Strongly types environment variables for accessing by the ConfigService
  Should be synced with the .env and .env.example files in order to keep consistency over the application environment variables
*/

interface Environment {
  SUSCRIBER_TOKEN: string;
  NODE_ENV: 'development' | 'production';
  WS_TO_NOTION_API_URL: string;
}
