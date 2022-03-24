import { container } from 'tsyringe';

import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';
import { EtherealProvider } from './MailProvider/implementations/EtherealProvider';

container.registerSingleton('DayjsDateProvider', DayjsDateProvider);

container.registerInstance('EtherealProvider', new EtherealProvider());
