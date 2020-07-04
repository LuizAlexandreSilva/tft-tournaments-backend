import { inject, injectable } from 'tsyringe';
import ITournamentsRepository from '@modules/tournaments/repositories/ITournamentsRepository';
import Tournament from '@modules/tournaments/infra/typeorm/entities/Tournament';

@injectable()
class SearchTournamentsService {
  constructor(
    @inject('TournamentsRepository')
    private tournamentsRepository: ITournamentsRepository,
  ) {}

  public async execute(name?: string): Promise<Tournament[]> {
    return this.tournamentsRepository.searchByName(name);
  }
}

export default SearchTournamentsService;
