import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

interface IEmailTransporterServiceConstructor {
  options: | string
  | SMTPTransport
  | SMTPTransport.Options;
}

class EmailTransporter {
  #transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor({ options }: IEmailTransporterServiceConstructor) {
    this.#transporter = this._createTransporter(options);
  }

  get transporter(): Transporter<SMTPTransport.SentMessageInfo> {
    return this.#transporter;
  }

  private _createTransporter(
    transportOptions: IEmailTransporterServiceConstructor['options'],
  ): Transporter<SMTPTransport.SentMessageInfo> {
    return nodemailer.createTransport(transportOptions);
  }
}

export { EmailTransporter };