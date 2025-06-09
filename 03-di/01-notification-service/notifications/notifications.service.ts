import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationsService {
  sendEmail(to: string, subject: string, message: string): void {
    console.log(`Email sent to ${to}: [Новая задача] ${message}`);
  }

  sendSMS(to: string, message: string): void {
    console.log(`SMS sent to ${to}: ${message}`);
  }
}
