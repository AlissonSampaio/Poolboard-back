import { AppDataSource } from "../database/data-source";
import { Match } from "../entities/Match";
import { Player as player } from "../entities/Player";
type MatchRequest = {
  id?: string;
  player_id: string;
  player_points?: number;
  opponent_id: string;
  opponent_points?: number;
};

export class MatchService {
  async create({
    player_id,
    player_points,
    opponent_id,
    opponent_points,
  }: MatchRequest): Promise<Error | Match> {
    const repo = AppDataSource.getRepository(Match);
    const Player = await AppDataSource.getRepository(player).findOneBy({
      id: player_id,
    });
    const Opponent = await AppDataSource.getRepository(player).findOneBy({
      id: opponent_id,
    });

    if (!Player) {
      return new Error("Player does not exist");
    }

    if (!Opponent) {
      return new Error("Opponent does not exist");
    }
    const matchVerify =
      (await repo.findOneBy({
        player_id: player_id,
        opponent_id: opponent_id,
      })) ??
      (await repo.findOneBy({
        player_id: opponent_id,
        opponent_id: player_id,
      }));

    if (matchVerify) {
      return new Error("Match already exists");
    }

    const match = repo.create({
      player_id,
      player_points,
      opponent_id,
      opponent_points,
    });
    await repo.save(match);

    return match;
  }

  async get({ player_id, opponent_id }) {
    const repo = AppDataSource.getRepository(Match);

    const match =
      (await repo.findOneBy({
        player_id: player_id,
        opponent_id: opponent_id,
      })) ??
      (await repo.findOneBy({
        player_id: opponent_id,
        opponent_id: player_id,
      }));

    if (!match) {
      return new Error("Match does not exists!");
    }

    return match;
  }

  async update({
    player_id,
    player_points,
    opponent_id,
    opponent_points,
  }: MatchRequest) {
    const repo = AppDataSource.getRepository(Match);
    const Player = await AppDataSource.getRepository(player).findOneBy({
      id: player_id,
    });
    const Opponent = await AppDataSource.getRepository(player).findOneBy({
      id: opponent_id,
    });

    const match =
      (await repo.findOneBy({
        player_id: player_id,
        opponent_id: opponent_id,
      })) ??
      (await repo.findOneBy({
        player_id: opponent_id,
        opponent_id: player_id,
      }));

    if (!match) {
      return new Error("Match does not exists!");
    }

    if (!Player) {
      return new Error("Player does not exist");
    }

    if (!Opponent) {
      return new Error("Opponent does not exist");
    }

    try {
      match.player_points = player_points;
      match.opponent_points = opponent_points;

      await repo.save(match);

      return match;
    } catch (err) {
      console.log(err);
      return new Error(err);
    }
  }
}
