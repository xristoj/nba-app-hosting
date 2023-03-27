import { GamingResult } from "./gaming-result";

export interface GamingResults {
    data: GamingResult[],
    meta: {
      total_pages: number,
      current_page: number,
      next_page: number,
      per_page: number,
      total_count: number
    };
}