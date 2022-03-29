import { container } from 'tsyringe';

import { EtherealProvider } from './implementations/EtherealProvider';
import { SESMailProvider } from './implementations/SESMailProvider';

const sendMail = {
  ethereal: container.resolve(EtherealProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance('MailProvider', sendMail[process.env.MAIL_PROVIDER]);
