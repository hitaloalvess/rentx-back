import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { EtherealProvider } from '@shared/container/providers/MailProvider/implementations/EtherealProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let usersRepositoryInMemory: IUsersRepository;
let usersTokensRepositoryInMemory: IUsersTokensRepository;
let dateProvider: IDateProvider;
let mailProvider: IMailProvider;
let sendForgotPasswordUseCase: SendForgotPasswordMailUseCase;

describe('Send forgot password', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail'); // Fica espiando MailProvider para ver se a função sendMail é chamada em algum momento

    await usersRepositoryInMemory.create({
      driver_license: 'ABC-12322',
      email: 'test@teste.com',
      name: 'Teste teste',
      password: '12345',
    });

    await sendForgotPasswordUseCase.execute('test@teste.com');

    expect(sendMail).toHaveBeenCalled(); // verifica se a função foi chamada
  });

  it('should not be able to send a forgot password mail to user nonexistent', () => {
    expect(async () => {
      await sendForgotPasswordUseCase.execute('test@teste.com');
    }).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create',
    );

    await usersRepositoryInMemory.create({
      driver_license: 'ABC-12322',
      email: 'test@teste.com',
      name: 'Teste teste',
      password: '12345',
    });

    await sendForgotPasswordUseCase.execute('test@teste.com');

    expect(generateTokenMail).toBeCalled();
  });
});
