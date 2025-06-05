import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Webhook } from './webhook.entity';
import { Repository } from 'typeorm';
import { CreateWebhookDto } from './dto/create-webhook.dto';

@Injectable()
export class WebhookService {
  constructor(
    @InjectRepository(Webhook)
    private readonly webhookRepo: Repository<Webhook>,
  ) {}

  async saveWebhook(dto: CreateWebhookDto) {
    const webhook = this.webhookRepo.create(dto);
    return this.webhookRepo.save(webhook);
  }

  async getAllLogs() {
    return this.webhookRepo.find({ order: { receivedAt: 'DESC' } });
  }

  async deleteAllLogs() {
    await this.webhookRepo.clear();
    return { message: 'All webhook logs deleted' };
  }
}
