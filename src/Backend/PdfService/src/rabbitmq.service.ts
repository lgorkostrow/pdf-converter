import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';
import { MasstransitMessage } from './messages/masstransit.message';

@Injectable()
export class RabbitmqService {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor(private readonly rabbitMqUri: string) {}

  async connect(): Promise<void> {
    this.connection = await amqp.connect(this.rabbitMqUri);
    this.channel = await this.connection.createChannel();
  }

  async sendToResponseAddress<T>(
    responseAddress: string,
    message: MasstransitMessage<T>,
  ): Promise<void> {
    const parts = responseAddress.split('/');
    const desiredPart = parts[parts.length - 1].split('?')[0];

    return await this.sendToQueue(desiredPart, message);
  }

  async sendToQueue<T>(
    queue: string,
    message: MasstransitMessage<T>,
  ): Promise<void> {
    await this.channel.assertQueue(queue, {
      durable: false,
      arguments: { 'x-expires': 60000 },
    });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }

  publishToExchange<T>(
    exchangeName: string,
    message: MasstransitMessage<T>,
  ): void {
    this.channel.publish(
      exchangeName,
      '',
      Buffer.from(JSON.stringify(message)),
    );
  }
}
