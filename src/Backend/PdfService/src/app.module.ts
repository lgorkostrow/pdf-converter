import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitmqService } from './rabbitmq.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'process';

export const RABBITMQ_URI_BUILDER = (configService: ConfigService) => {
  return `amqp://${configService.get('RABBITMQ_USER')}:${configService.get(
    'RABBITMQ_PASS',
  )}@${configService.get('RABBITMQ_HOST')}/${configService.get(
    'RABBITMQ_VHOST',
  )}`;
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          exchanges: [
            {
              name: 'PdfConverter.ApiOrchestrator:Request',
              type: 'fanout',
              options: {},
            },
          ],
          uri: RABBITMQ_URI_BUILDER(configService),
          enableControllerDiscovery: true,
          channels: {},
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [PdfController],
  providers: [
    PdfService,
    {
      provide: RabbitmqService,
      useFactory: async (configService: ConfigService) => {
        const rabbitMqUri = RABBITMQ_URI_BUILDER(configService);
        const service = new RabbitmqService(rabbitMqUri);
        await service.connect();

        return service;
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
