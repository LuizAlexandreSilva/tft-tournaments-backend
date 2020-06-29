import { inject, injectable } from 'tsyringe';
import ITournamentsRepository from '@modules/tournaments/repositories/ITournamentsRepository';
import Tournament from '@modules/tournaments/infra/typeorm/entities/Tournament';
import ICreateTournamentDTO from '@modules/tournaments/dtos/ICreateTournamentDTO';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateTournamentService {
  constructor(
    @inject('TournamentsRepository')
    private tournamentsRepository: ITournamentsRepository,
  ) {}

  public async execute({
    name,
    description,
    ownerId,
  }: ICreateTournamentDTO): Promise<Tournament> {
    const checkTournamentName = await this.tournamentsRepository.findByName(
      name,
    );

    if (checkTournamentName) {
      throw new AppError('Tournament name is already in use.');
    }

    const tournament = await this.tournamentsRepository.create({
      name,
      description,
      ownerId,
    });

    return tournament;
  }
}

export default CreateTournamentService;
