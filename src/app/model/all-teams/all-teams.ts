import { SingleTeam } from "./single-team";

export interface AllTeams {
    data: SingleTeam[],
    meta: {
      total_pages: number,
      current_page: number,
      next_page: number,
      per_page: number,
      total_count: number
    };
}
