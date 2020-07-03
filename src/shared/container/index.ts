import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ITournamentsRepository from '@modules/tournaments/repositories/ITournamentsRepository';
import TournamentsRepository from '@modules/tournaments/infra/typeorm/repositories/TournamentsRepository';
import TournamentBracketsRepository from '@modules/tournaments/infra/typeorm/repositories/TournamentBracketsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ITournamentsRepository>(
  'TournamentsRepository',
  TournamentsRepository,
);

container.registerSingleton<TournamentBracketsRepository>(
  'TournamentBracketsRepository',
  TournamentBracketsRepository,
);
