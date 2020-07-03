import { Request, Response } from 'express';
import { container } from 'tsyringe';
import GenerateBracketsService from '@modules/tournaments/services/GenerateBracketsService';
import StorePlayersService from '@modules/tournaments/services/StorePlayersService';

export default class TournamentBracketsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { tournamentId, phaseNumber } = request.params;

    const generateBrackets = container.resolve(GenerateBracketsService);

    const brackets = await generateBrackets.execute({
      tournamentId: Number(tournamentId),
      phaseNumber: Number(phaseNumber),
    });

    return response.json(brackets);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { tournamentId, numPhase } = request.params;
    const { players } = request.body;

    const storePlayers = container.resolve(StorePlayersService);

    const tournamentBrackets = await storePlayers.execute({
      tournamentId: Number(tournamentId),
      players,
      numPhase: Number(numPhase),
    });

    return response.json(tournamentBrackets);
  }
}
