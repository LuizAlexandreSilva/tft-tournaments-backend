import { inject, injectable } from 'tsyringe';
import ITournamentsRepository from '@modules/tournaments/repositories/ITournamentsRepository';
import Tournament from '@modules/tournaments/infra/typeorm/entities/Tournament';

@injectable()
class ListOrganizerTournamentsService {
  constructor(
    @inject('TournamentsRepository')
    private tournamentsRepository: ITournamentsRepository,
  ) {}

  public async execute(ownerId: number): Promise<[Tournament[], number]> {
    return this.tournamentsRepository.findAllByOwner(ownerId);
  }
}

export default ListOrganizerTournamentsService;
