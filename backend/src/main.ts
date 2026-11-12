import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import cors from 'cors';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const nodeEnv = configService.get<string>('NODE_ENV', 'development');
  const corsOrigin = configService.get<string>('CORS_ORIGIN', 'http://localhost:3000,http://localhost:5173');

  // Security middleware
  app.use(helmet());
  app.use(
    cors({
      origin: corsOrigin.split(','),
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global interceptors
  app.useGlobalInterceptors(new LoggingInterceptor());

  // API prefix
  app.setGlobalPrefix('api');

  // Start server
  await app.listen(port, '0.0.0.0');

  console.log(`
╔════════════════════════════════════════════════════╗
║           🚀 Mulee Portfolio API Server            ║
╠════════════════════════════════════════════════════╣
║                                                    ║
║  ✅ Server started successfully                   ║
║  📍 Listening on: http://localhost:${port}           ║
║  🌍 Environment: ${nodeEnv.toUpperCase().padEnd(35)}║
║  🔐 CORS Enabled for: ${corsOrigin.length} origin(s)    ║
║                                                    ║
║  📚 API Documentation: http://localhost:${port}/api  ║
║                                                    ║
╚════════════════════════════════════════════════════╝
  `);
}

bootstrap().catch((err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});
