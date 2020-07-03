import ITournamentBracketsRepository from '@modules/tournaments/repositories/ITournamentBracketsRepository';
import {
  DeepPartial,
  getRepository,
  MoreThan,
  Repository,
  Transaction,
} from 'typeorm';
import TournamentBracket from '@modules/tournaments/infra/typeorm/entities/TournamentBracket';
import ICreateTournamentBracketsDTO from '@modules/tournaments/dtos/ICreateTournamentBracketsDTO';
import IFindPlayersInPhaseDTO from '@modules/tournaments/dtos/iFindPlayersInPhaseDTO';
import ICheckEditPermissionDTO from '@modules/tournaments/dtos/ICheckEditPermissionDTO';

class TournamentBracketsRepository implements ITournamentBracketsRepository {
  private ormRepository: Repository<TournamentBracket>;

  constructor() {
    this.ormRepository = getRepository(TournamentBracket);
  }

  public async create({
    players,
    phaseNumber,
    tournamentId,
  }: ICreateTournamentBracketsDTO): Promise<TournamentBracket[]> {
    const partialEntity: DeepPartial<TournamentBracket>[] = players.map(
      player => {
        return {
          playerNickname: player,
          tournamentId,
          numPhase: phaseNumber,
        };
      },
    );

    await this.ormRepository.delete({
      tournamentId,
      numPhase: phaseNumber,
    });

    const tournamentBrackets = this.ormRepository.create(partialEntity);

    await this.ormRepository.save(tournamentBrackets);

    return tournamentBrackets;
  }

  public async findTournamentBracketsInPhase(
    data: IFindPlayersInPhaseDTO,
  ): Promise<TournamentBracket[]> {
    const { tournamentId, phaseNumber } = data;

    return this.ormRepository.find({
      where: {
        numPhase: phaseNumber,
        tournamentId,
      },
      order: {
        id: 'ASC',
      },
    });
  }

  public async checkPermissionToEditPhase({
    tournamentId,
    numPhase,
  }: ICheckEditPermissionDTO): Promise<boolean> {
    const count = await this.ormRepository.count({
      where: {
        tournamentId,
        numPhase: MoreThan(numPhase),
      },
    });
    return count === 0;
  }

  public async bulkSetPhase(
    partial: DeepPartial<TournamentBracket>[],
  ): Promise<void> {
    partial.map(item => {
      if (item) {
        this.ormRepository.update(
          {
            tournamentId: item.tournamentId,
            playerNickname: item.playerNickname,
            numPhase: item.numPhase,
          },
          new TournamentBracket(),
        );
      }
    });
  }
}

export default TournamentBracketsRepository;
