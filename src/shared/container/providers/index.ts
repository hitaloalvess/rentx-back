import { container } from 'tsyringe';

import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';
import { EtherealProvider } from './MailProvider/implementations/EtherealProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider';

container.registerSingleton('DayjsDateProvider', DayjsDateProvider);

container.registerInstance('EtherealProvider', new EtherealProvider());

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};
container.registerSingleton('StorageProvider', diskStorage[process.env.disk]);
