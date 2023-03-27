import { HomeTeam } from "./home-team";
import { VisitorTeam } from "./visitor-team";

export interface DisplayTeam {
    id: number,
    teamData: HomeTeam | VisitorTeam
}