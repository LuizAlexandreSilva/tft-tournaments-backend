import { inject, injectable } from 'tsyringe';
import ITournamentsRepository from '@modules/tournaments/repositories/ITournamentsRepository';
import Tournament from '@modules/tournaments/infra/typeorm/entities/Tournament';
import AppError from '@shared/errors/AppError';

@injectable()
class TournamentDetailService {
  constructor(
    @inject('TournamentsRepository')
    private tournamentsRepository: ITournamentsRepository,
  ) {}

  public async execute(id: number): Promise<Tournament> {
    const tournament = await this.tournamentsRepository.findById(id);

    if (!tournament) {
      throw new AppError('Tournament not found.');
    }

    return tournament;
  }
}

export default TournamentDetailService;
