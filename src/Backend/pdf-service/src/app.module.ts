import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitmqService } from './rabbitmq.service';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'PdfConverter.ApiOrchestrator:Request',
          type: 'fanout',
          options: {},
        },
      ],
      uri: 'amqp://guest:guest@localhost:5672/CUSTOM_HOST',
      enableControllerDiscovery: true,
      channels: {},
    }),
    AppModule,
  ],
  controllers: [PdfController],
  providers: [PdfService, RabbitmqService],
})
export class AppModule {}
