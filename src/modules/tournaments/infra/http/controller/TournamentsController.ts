import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateTournamentService from '@modules/tournaments/services/CreateTournamentService';
import TournamentDetailService from '@modules/tournaments/services/TournamentDetailService';
import { classToClass } from 'class-transformer';

export default class TournamentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, ownerId } = request.body;

    const createTournament = container.resolve(CreateTournamentService);

    const tournament = await createTournament.execute({
      name,
      description,
      ownerId,
    });

    return response.json(tournament);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const tournamentDetail = container.resolve(TournamentDetailService);

    const tournament = await tournamentDetail.execute(Number(id));

    return response.json(classToClass(tournament));
  }
}
