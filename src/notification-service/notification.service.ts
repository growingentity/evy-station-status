import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {
  constructor(private config: ConfigService) {}

  async notifyByTelegram(message: string) {
    await fetch(
      `https://api.telegram.org/bot${this.config.get<string>('TELEGRAM_BOT_ID')}/sendMessage?chat_id=${this.config.get<string>('TELEGRAM_CHAT_ID')}&text=${message}`,
      {
        method: 'POST',
      },
    );
  }
}
