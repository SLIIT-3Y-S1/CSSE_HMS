import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 4200;
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    // origin: `http://localhost:${port}`,
    origin: true,
  });

  await app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

 
}
bootstrap();
