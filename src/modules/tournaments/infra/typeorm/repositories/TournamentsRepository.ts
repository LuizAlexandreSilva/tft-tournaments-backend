import ITournamentsRepository from '@modules/tournaments/repositories/ITournamentsRepository';
import { getRepository, Repository } from 'typeorm';
import Tournament from '@modules/tournaments/infra/typeorm/entities/Tournament';
import ICreateTournamentDTO from '@modules/tournaments/dtos/ICreateTournamentDTO';
import { ILike } from '@shared/utils/findOperatorWithExtras';

class TournamentsRepository implements ITournamentsRepository {
  private ormRepository: Repository<Tournament>;

  constructor() {
    this.ormRepository = getRepository(Tournament);
  }

  public async create(data: ICreateTournamentDTO): Promise<Tournament> {
    const tournament = this.ormRepository.create(data);

    await this.ormRepository.save(tournament);

    return tournament;
  }

  public async findById(id: number): Promise<Tournament | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByName(name: string): Promise<Tournament | undefined> {
    return this.ormRepository.findOne({
      where: { name: ILike<string>(`%${name}%`) },
    });
  }

  public async findAllByOwner(
    ownerId: number,
  ): Promise<[Tournament[], number]> {
    return this.ormRepository.findAndCount({
      where: { ownerId },
    });
  }
}

export default TournamentsRepository;
