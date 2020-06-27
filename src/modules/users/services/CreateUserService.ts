import User from '@modules/users/infra/typeorm/entities/User';
import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  username: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ username, email, password }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUsernameUsed = await usersRepository.findOne({
      where: { username },
    });

    if (checkUsernameUsed) {
      throw new AppError('Username already in use.');
    }

    const checkEmailUsed = await usersRepository.findOne({
      where: { email },
    });

    if (checkEmailUsed) {
      throw new AppError('E-mail already in use.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
