import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  log(data: any) {
    return data;
  }
}
