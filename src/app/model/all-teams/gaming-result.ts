import { HomeTeam } from "./home-team";
import { VisitorTeam } from "./visitor-team";

export interface GamingResult {
    date: string,
    home_team: HomeTeam,
    home_team_score: number,
    id: number,
    period: number,
    postseason: boolean,
    season: number,
    status: string,
    time: string,
    visitor_team: VisitorTeam,
    visitor_team_score: number
}