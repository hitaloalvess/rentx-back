import auth from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    // Verificar se o token é valido
    const { email, sub: user_id } = verify(
      token,
      auth.secret_refresh_token,
    ) as IPayload;

    // Verificar se o token existe no banco de dados
    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      );

    // Validar caso o registro não exista no banco de dados
    if (!userToken) {
      throw new AppError('Refresh token does not exists!');
    }

    // Remover o registro do banco com token e refresh_token já existente
    await this.usersTokensRepository.deleteById(userToken.id);

    // Criar novo refresh token
    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: userToken.id,
      expiresIn: auth.expires_in_refresh_token,
    });

    // Salvar o novo refresh token no banco
    const expires_date = this.dayjsDateProvider.addDays(
      auth.expires_in_refresh_token_days,
    );

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    // Criar novo token
    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    // retornar refresh token
    return {
      token: newToken,
      refresh_token,
    };
  }
}

export { RefreshTokenUseCase };
