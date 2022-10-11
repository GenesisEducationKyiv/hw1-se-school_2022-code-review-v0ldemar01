/* eslint-disable @typescript-eslint/no-empty-interface */
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { EmailTransporter } from '../email-transporter/email-transporter.service.js';

interface IEmailServiceConstructor {
  emailTransporter: EmailTransporter;
  sourceEmail: string;
}

class Email {
  #emailTransporter: EmailTransporter;
  #sourceEmail: string;

  constructor({ emailTransporter, sourceEmail }: IEmailServiceConstructor) {
    this.#emailTransporter = emailTransporter;
    this.#sourceEmail = sourceEmail;
  }

  public sendCurrentBTCToUAHCurrencyEmail(
    params: { to: string, rate: number },
  ): Promise<SMTPTransport.SentMessageInfo> {
    const emailOptions = {
      to: params.to,
      from: this.#sourceEmail,
      subject: 'BTC to UAH currency subscription',
      text: `
        You have subcribed to receive currency BTC to UAH. Current BTC rate is ${params.rate} UAH
      `,
    };
    return this._sendEmail(emailOptions);
  }

  private async _sendEmail(emailOptions: Mail.Options): Promise<SMTPTransport.SentMessageInfo> {
    return this.#emailTransporter.sendEmailViaTransporter(emailOptions);
  }
}

export { Email };