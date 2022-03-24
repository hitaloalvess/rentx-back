import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider } from '../IMailProvider';

interface IVariables {
  [key: string]: string;
}

class EtherealProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    nodemailer
      .createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch(err => console.error(err));
  }

  async sendMail(
    to: string,
    subject: string,
    variables: IVariables,
    path: string,
  ): Promise<void> {
    const templateContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateContent);

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      from: 'Rentx <hitalo.ralves@outlook.com>',
      to,
      subject,
      html: templateHTML,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealProvider };
