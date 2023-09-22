import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RabbitmqService } from './rabbitmq.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rabbitmqService = app.get(RabbitmqService);
  await rabbitmqService.connect(
    'amqp://guest:guest@localhost:5672/CUSTOM_HOST',
  );
  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();
