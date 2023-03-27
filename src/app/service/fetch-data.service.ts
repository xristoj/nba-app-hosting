import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AllTeams } from '../model/all-teams/all-teams';
import { SingleTeam } from '../model/all-teams/single-team';
import { GamingResults } from '../model/all-teams/gaming-results';
import { GamingResult } from '../model/all-teams/gaming-result';
import { DisplayTeam } from '../model/all-teams/display-team';

@Injectable({
    providedIn: 'root'
})
export class FetchDataService {

    teamList: SingleTeam[]; // list of teams in the select-box
    gamingResults: GamingResult[]; // gaming results of the last 12 days of a certain team
    idSelectTeam: number; // id of the selected team
    displayTeamList: DisplayTeam[] = [];

    constructor(private http: HttpClient) { }

    getAllTeams(): Observable<AllTeams> {
        return this.http.get<AllTeams>(
            "https://free-nba.p.rapidapi.com/teams",
            {
                headers: {         
                    'X-RapidAPI-Key':'2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
                    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
                }
           
            }
        );
    }

    getSpecificTeam(team: String, todayDate: String): Observable<GamingResults> {
        this.idSelectTeam = +team;
        let dateList: String = "";
        const [year, month, day] = todayDate.split('-').map(Number);
        const newDate: Date = new Date(year, month - 1, day);
        for (let i = 0; i < 11; i++) {
            newDate.setDate(newDate.getDate() - 1);
            const year = newDate.getFullYear();
            const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
            const day = newDate.getDate().toString().padStart(2, '0');
            dateList += `dates[]=${year}-${month}-${day}&`;
        }
        return this.http.get<GamingResults>(
            //"https://free-nba.p.rapidapi.com/games?page=0&dates[]=2022-12-08&dates[]=2022-12-07&dates[]=2022-12-06&dates[]=2022-12-05&dates[]=2022-12-04&per_page=12&team_ids[]="+team,
            "https://free-nba.p.rapidapi.com/games?page=0&"+ dateList +"per_page=12&team_ids[]="+team,
            {
                headers: {         
                    'X-RapidAPI-Key':'2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
                    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
                }
           }
        );
    }

    removeItem(id: number) {
        for(let i = 0; i < this.displayTeamList.length; i++) {
            if(this.displayTeamList[i].id === id) {
                this.displayTeamList.splice(i, 1);
                break;
            }
        }
    }
}
