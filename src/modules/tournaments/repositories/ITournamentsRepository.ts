import ICreateTournamentDTO from '@modules/tournaments/dtos/ICreateTournamentDTO';
import Tournament from '@modules/tournaments/infra/typeorm/entities/Tournament';

export default interface ITournamentsRepository {
  create(data: ICreateTournamentDTO): Promise<Tournament>;
  findById(id: number): Promise<Tournament | undefined>;
  findByName(name: string): Promise<Tournament | undefined>;
  findAllByOwner(ownerId: number): Promise<[Tournament[], number]>;
}
