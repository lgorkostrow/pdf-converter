import { Controller } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitmqService } from './rabbitmq.service';
import { MasstransitMessage } from './messages/masstransit.message';
import { ConvertHtmlToPdfCommand } from './messages/convert-html-to-pdf.command';
import { MasstransitMessageBuilder } from './masstransit-message.builder';
import { HtmlToPdfConvertedEvent } from './messages/html-to-pdf-converted.event';

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

    const pdfContent = await this.pdfService.print(
      Buffer.from(data.message.fileContent, 'base64'),
    );

    const message = new MasstransitMessageBuilder<HtmlToPdfConvertedEvent>()
      .setMessageType('urn:message:Messaging.Messages:HtmlToPdfConvertedEvent')
      .setMessage({
        fileName: data.message.fileName,
        mimeType: 'application/pdf',
        fileContent: pdfContent.toString('base64'),
      })
      .build();

    this.rabbitmqService.publishToExchange(
      'Messaging.Messages:HtmlToPdfConvertedEvent',
      message,
    );
  }
}
