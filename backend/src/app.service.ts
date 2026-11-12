import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): {
    message: string;
    version: string;
    status: string;
  } {
    return {
      message: 'Welcome to Mulee Portfolio API',
      version: '1.0.0',
      status: 'running',
    };
  }

  health(): { status: string; timestamp: string } {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }
}
