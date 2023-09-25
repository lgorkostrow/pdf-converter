import { Controller } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitmqService } from './rabbitmq.service';
import { MasstransitMessage } from './messages/masstransit.message';
import { ConvertHtmlToPdfCommand } from './messages/convert-html-to-pdf.command';

@Controller('controller-discovery')
export class PdfController {
  constructor(
    private readonly pdfService: PdfService,
    private readonly rabbitmqService: RabbitmqService,
  ) {}

  @RabbitSubscribe({
    exchange: 'Messaging.Messages:ConvertHtmlToPdfCommand',
    routingKey: '',
    queue: 'queue-convert-html-to-pdf',
  })
  async print(
    @RabbitPayload() data: MasstransitMessage<ConvertHtmlToPdfCommand>,
  ): Promise<void> {
    console.log(data);

    await this.pdfService.print(data.message.fileContent);

    console.log('printed');
  }

  // @RabbitRPC({
  //   exchange: 'PdfConverter.ApiOrchestrator:Request',
  //   routingKey: '',
  //   queue: 'test-queue-123123',
  // })
  // async handleMessage(
  //   @RabbitPayload() data: MasstransitMessage<ConvertHtmlToPdfPayload>,
  // ) {
  //   // Handle the incoming message
  //   console.log(data);
  //
  //   const message = new MasstransitMessageBuilder<ConvertHtmlToPdfPayload>()
  //     .setRequestId(data.requestId)
  //     .setConversationId(data.conversationId)
  //     .setSourceAddress(data.sourceAddress)
  //     .setDestinationAddress(data.responseAddress)
  //     .setMessageType('urn:message:PdfConverter.ApiOrchestrator:Response')
  //     .setMessage({ content: 'Test COntent Response 12' })
  //     .build();
  //
  //   await this.rabbitmqService.sendToResponseAddress(
  //     data.responseAddress,
  //     message,
  //   );
  // }
}
