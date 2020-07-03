import { inject, injectable } from 'tsyringe';
import ITournamentBracketsRepository from '@modules/tournaments/repositories/ITournamentBracketsRepository';
import TournamentBracket from '@modules/tournaments/infra/typeorm/entities/TournamentBracket';
import { getConnection } from 'typeorm';
import { shuffle } from 'd3-array';
import AppError from '@shared/errors/AppError';

interface IRequest {
  tournamentId: number;
  numPhase: number;
  players: string[];
}

@injectable()
class StorePlayersService {
  constructor(
    @inject('TournamentBracketsRepository')
    private tournamentBracketsRepository: ITournamentBracketsRepository,
  ) {}

  public async execute({
    tournamentId,
    numPhase,
    players,
  }: IRequest): Promise<TournamentBracket[]> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    let playersToStore = players;

    if (numPhase === 1) {
      playersToStore = shuffle(players);
    }

    const hasPermission = await this.tournamentBracketsRepository.checkPermissionToEditPhase(
      {
        tournamentId,
        numPhase,
      },
    );

    if (!hasPermission) {
      throw new AppError("You can't edit past phases");
    }

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      return this.tournamentBracketsRepository.create({
        players: playersToStore,
        tournamentId,
        phaseNumber: numPhase,
      });
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new AppError('Error storing players');
    } finally {
      await queryRunner.release();
    }
  }
}

export default StorePlayersService;
