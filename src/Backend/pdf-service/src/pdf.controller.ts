import {
  Controller,
  Header,
  Inject,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PdfService } from './pdf.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import {
  AmqpConnection,
  RabbitPayload,
  RabbitRPC,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import { RabbitmqService } from './rabbitmq.service';
import { v4 as uuidv4 } from 'uuid';
import { MasstransitMessage } from './messages/masstransit.message';
import { ConvertHtmlToPdfPayload } from './messages/convert-html-to-pdf.payload';
import { MasstransitMessageBuilder } from './masstransit-message.builder';

@Controller('controller-discovery')
export class PdfController {
  constructor(
    private readonly pdfService: PdfService,
    private readonly rabbitmqService: RabbitmqService,
  ) {}

  // @Post('print')
  // @Header('Content-Type', 'application/pdf')
  // @UseInterceptors(FileInterceptor('file'))
  // async print(
  //   @UploadedFile() file: Express.Multer.File,
  // ): Promise<StreamableFile> {
  //   return new StreamableFile(await this.pdfService.print(file.buffer));
  // }

  @RabbitRPC({
    exchange: 'PdfConverter.ApiOrchestrator:Request',
    routingKey: '',
    queue: 'test-queue-123123',
  })
  async handleMessage(
    @RabbitPayload() data: MasstransitMessage<ConvertHtmlToPdfPayload>,
  ) {
    // Handle the incoming message
    console.log(data);

    const message = new MasstransitMessageBuilder<ConvertHtmlToPdfPayload>()
      .setRequestId(data.requestId)
      .setConversationId(data.conversationId)
      .setSourceAddress(data.sourceAddress)
      .setDestinationAddress(data.responseAddress)
      .setMessageType('urn:message:PdfConverter.ApiOrchestrator:Response')
      .setMessage({ content: 'Test COntent Response 12' })
      .build();

    await this.rabbitmqService.sendToResponseAddress(
      data.responseAddress,
      message,
    );
  }
}
