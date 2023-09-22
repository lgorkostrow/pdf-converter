import { MasstransitMessage } from './messages/masstransit.message';
import { v4 as uuidv4 } from 'uuid';

export class MasstransitMessageBuilder<T> {
  private requestId: string | null;
  private correlationId: string | null;
  private conversationId: string | null;
  private sourceAddress: string | null;
  private destinationAddress: string | null;
  private messageType: string | null;
  private message: T;

  setRequestId(requestId: string | null): MasstransitMessageBuilder<T> {
    this.requestId = requestId;

    return this;
  }

  setCorrelationId(correlationId: string | null): MasstransitMessageBuilder<T> {
    this.correlationId = correlationId;

    return this;
  }

  setConversationId(
    conversationId: string | null,
  ): MasstransitMessageBuilder<T> {
    this.conversationId = conversationId;

    return this;
  }

  setSourceAddress(sourceAddress: string | null): MasstransitMessageBuilder<T> {
    this.sourceAddress = sourceAddress;

    return this;
  }

  setDestinationAddress(
    destinationAddress: string | null,
  ): MasstransitMessageBuilder<T> {
    this.destinationAddress = destinationAddress;

    return this;
  }

  setMessageType(messageType: string | null): MasstransitMessageBuilder<T> {
    this.messageType = messageType;

    return this;
  }

  setMessage(message: T): MasstransitMessageBuilder<T> {
    this.message = message;

    return this;
  }

  build(): MasstransitMessage<T> {
    return {
      messageId: uuidv4(),
      requestId: this.requestId,
      correlationId: this.correlationId,
      conversationId: this.conversationId,
      initiatorId: null,
      sourceAddress: this.sourceAddress,
      destinationAddress: this.destinationAddress,
      responseAddress: null,
      faultAddress: null,
      messageType: [this.messageType],
      message: this.message,
      expirationTime: null,
      sentTime: new Date().toISOString(),
      headers: {},
      host: {
        machineName: 'IHOR-PC',
        processName: 'nestjs_service',
        processId: process.pid,
        assembly: 'nestjs_service',
        assemblyVersion: '1.0.0.0',
        frameworkVersion: '',
        massTransitVersion: '8.1.0.0',
        operatingSystemVersion: 'Microsoft Windows NT 10.0.22000.0',
      },
    };
  }
}
