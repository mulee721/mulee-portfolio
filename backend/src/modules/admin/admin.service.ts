import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getHello(): string {
    return 'Admin module is ready!';
  }
}
