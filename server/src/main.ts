import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Supplements App server API' as string)
    .setDescription('General API of backend part of the project')
    .setVersion('1.0.0')
    .addGlobalResponse({
      status: 500,
      description: 'Internal Server Error',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 8080;
  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`Nest application is running on 'http://localhost:${port}'`);
}
void bootstrap();
