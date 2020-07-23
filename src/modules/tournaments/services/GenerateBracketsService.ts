import { inject, injectable } from 'tsyringe';
import ITournamentBracketsRepository from '@modules/tournaments/repositories/ITournamentBracketsRepository';
import Bracket from '@modules/tournaments/models/Bracket';
import AppError from '@shared/errors/AppError';
import TournamentBracket from '@modules/tournaments/infra/typeorm/entities/TournamentBracket';
import { DeepPartial, getConnection } from 'typeorm';

interface IRequest {
  tournamentId: number;
  phaseNumber: number;
}

@injectable()
class GenerateBracketsService {
  constructor(
    @inject('TournamentBracketsRepository')
    private tournamentBracketsRepository: ITournamentBracketsRepository,
  ) {}

  public async execute({
    tournamentId,
    phaseNumber,
  }: IRequest): Promise<Bracket[]> {
    const bracketsFromCurrentPhase = await this.tournamentBracketsRepository.findTournamentBracketsInPhase(
      {
        tournamentId,
        phaseNumber,
      },
    );

    const players = bracketsFromCurrentPhase.map(
      bracket => bracket.playerNickname,
    );

    return this.buildBrackets(players, phaseNumber, tournamentId);
  }

  private async buildBrackets(
    players: string[],
    phaseNumber: number,
    tournamentId: number,
  ): Promise<Bracket[]> {
    const numPlayers = players.length;
    const numBrackets = this.getBracketsQuantity(numPlayers);

    const brackets = [];
    const playersCopy = Object.assign([], players);

    for (let i = 0; i < numBrackets; i += 1) {
      const bracket: Bracket = {
        groupNumber: i + 1,
        players: [],
      };
      brackets.push(bracket);
    }

    return this.alocatePlayers(
      brackets,
      playersCopy,
      phaseNumber,
      tournamentId,
    );
  }

  private async alocatePlayers(
    brackets: Bracket[],
    players: string[],
    phaseNumber: number,
    tournamentId: number,
  ): Promise<Bracket[]> {
    let index = 1;
    const tournamentBrackets: DeepPartial<TournamentBracket>[] = [];

    while (players.length > 0) {
      const currentBracket = brackets.find(
        // eslint-disable-next-line no-loop-func
        bracket => bracket.groupNumber === index,
      );

      if (currentBracket) {
        if (currentBracket.players.length >= 8) {
          throw new AppError(
            `We can't generate brackets for this quantity of players.`,
          );
        }
        const currentPlayer = players[0];
        currentBracket.players.push(currentPlayer);
        players.splice(0, 1);

        tournamentBrackets.push({
          tournamentId,
          playerNickname: currentPlayer,
          numPhase: phaseNumber,
          bracketNumber: currentBracket.groupNumber,
        });
      }
      index = index + 1 > brackets.length ? 1 : index + 1;
    }

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      tournamentBrackets.forEach(async tBracket => {
        await this.tournamentBracketsRepository.setPlayerBracket(tBracket);
      });
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new AppError('Error storing players');
    } finally {
      await queryRunner.release();
    }

    return brackets;
  }

  private getBracketsQuantity(numPlayers: number): number {
    if (numPlayers < 8) {
      throw new AppError('You must have more than 8 players in tournament.');
    }
    const numBrackets = Math.ceil(numPlayers / 8);

    if (numPlayers === 8) {
      return 1;
    }
    return numBrackets * 4 < 16 && numPlayers >= 20
      ? numBrackets + 1
      : numBrackets;
  }
}

export default GenerateBracketsService;
