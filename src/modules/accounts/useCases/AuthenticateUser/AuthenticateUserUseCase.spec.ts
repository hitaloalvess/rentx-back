import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

import { AppError } from '../../../../shared/errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUseCase } from './AuthenticateUserUseCase';

let dayJsDateProvider: IDateProvider;
let usersTokensRepositoryInMemory: IUsersTokensRepository;
let usersRepositoryInMemory: IUsersRepository;
let authenticateUserUseCase: AuthenticateUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate user', () => {
  beforeEach(() => {
    dayJsDateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dayJsDateProvider,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '0000123',
      name: 'User test',
      email: 'test@test.com',
      password: '1234',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'error@error.com',
        password: '1234',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect', 401));
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '0000123',
      name: 'User test',
      email: 'test@test.com',
      password: '1234',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: 'test@test.com',
        password: 'incorrectpassword',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect', 401));
  });
});
