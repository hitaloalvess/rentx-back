import { IMailProvider } from '../IMailProvider';

interface IVariables {
  [key: string]: string;
}

interface IMessage {
  [key: string]: string | IVariables;
}

class MailProviderInMemory implements IMailProvider {
  private message: IMessage[] = [];

  async sendMail(
    to: string,
    subject: string,
    variables: IVariables,
    path: string,
  ): Promise<void> {
    this.message.push({
      to,
      subject,
      variables,
      path,
    });
  }
}

export { MailProviderInMemory };
