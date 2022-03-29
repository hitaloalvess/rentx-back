import { SES } from 'aws-sdk';
import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider } from '../IMailProvider';

interface IVariables {
  [key: string]: string;
}

class SESMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
      }),
    });
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

    await this.client.sendMail({
      from: 'Rentx <hitalo.ralves@outlook.com>', // COLOCAR EMAIL VALIDO QUANDO FOR REGISTRAR DOMINIO E FINALIZAR A IMPLEMENTACAO
      to,
      subject,
      html: templateHTML,
    });
  }
}

export { SESMailProvider };
