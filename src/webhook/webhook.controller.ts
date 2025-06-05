import { Controller, Headers, Body, Post, UnauthorizedException, Get, Delete } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { ConfigService } from '@nestjs/config';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  async handleWebhook(@Headers() headers: any, @Body() body: any) {
    const publicKey = this.configService.get('PUBLIC_KEY');
    const privateKey = this.configService.get('PRIVATE_KEY');

    if (
      headers['x-public-key'] !== publicKey ||
      headers['x-private-key'] !== privateKey
    ) {
      throw new UnauthorizedException('Invalid keys');
    }

    return this.webhookService.saveWebhook({ headers, body });
  }

  @Get('logs')
  getAllLogs() {
    return this.webhookService.getAllLogs();
  }

  @Delete('logs')
  deleteAllLogs() {
    return this.webhookService.deleteAllLogs();
  }
}
