import TournamentBracket from '@modules/tournaments/infra/typeorm/entities/TournamentBracket';
import ICreateTournamentBracketsDTO from '@modules/tournaments/dtos/ICreateTournamentBracketsDTO';
import IFindPlayersInPhaseDTO from '@modules/tournaments/dtos/iFindPlayersInPhaseDTO';
import ICheckEditPermissionDTO from '@modules/tournaments/dtos/ICheckEditPermissionDTO';
import { DeepPartial } from 'typeorm';

export default interface ITournamentBracketsRepository {
  create(data: ICreateTournamentBracketsDTO): Promise<TournamentBracket[]>;
  findTournamentBracketsInPhase(
    data: IFindPlayersInPhaseDTO,
  ): Promise<TournamentBracket[]>;
  checkPermissionToEditPhase(data: ICheckEditPermissionDTO): Promise<boolean>;
  bulkSetPhase(partial: DeepPartial<TournamentBracket>[]): Promise<void>;
}
