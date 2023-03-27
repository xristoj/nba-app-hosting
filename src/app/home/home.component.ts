import { Component } from '@angular/core';
import { AllTeams } from '../model/all-teams/all-teams';
import { GamingResult } from '../model/all-teams/gaming-result';
import { GamingResults } from '../model/all-teams/gaming-results';
import { SingleTeam } from '../model/all-teams/single-team';
import { FetchDataService } from '../service/fetch-data.service';
import {DisplayTeam} from "../model/all-teams/display-team";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    teamList: SingleTeam[];
    selectedValue: String;
    selectedOption: boolean = false;
    gamingResults: GamingResult[];
    displayTeam: DisplayTeam;
    displayTeamList: DisplayTeam[];
    currentScoreList: string[];
    currentScoreValue: number;
    currentScoreValueBothTeams: string[];

    constructor(private fetchDataService: FetchDataService) {
        this.initializeDisplayTeam();
        this.displayTeamList = this.fetchDataService.displayTeamList; // initialize our displayTeamList property with the values from our service
    }

    ngOnInit(): void {
        this.fetchDataService.getAllTeams().subscribe((data: AllTeams) => {
            console.log(data);
            this.fetchDataService.teamList = data.data;
            this.teamList = this.fetchDataService.teamList;
        })
    }

    getTeam(): void {
        this.selectedOption = false;
        if(!this.checkIfTeamExists(+this.selectedValue)) {
            const currentDate: Date = new Date();
            const year: String = currentDate.getFullYear().toString();
            const month: String = (currentDate.getMonth() + 1).toString().padStart(2, "0");
            const day: String = currentDate.getDate().toString().padStart(2, "0");
            const formattedDate: String = `${year}-${month}-${day}`;
            this.fetchDataService.getSpecificTeam(this.selectedValue, formattedDate).subscribe((data: GamingResults) => {
                this.fetchDataService.gamingResults = data.data;
                this.gamingResults = this.fetchDataService.gamingResults;
                this.extractTeam();
                this.selectedOption = true;
            });
        } else {
            alert("This Team is already listed!");
            this.selectedOption = true;
        }
    }

    extractTeam(): void {
        console.log(this.gamingResults)
        let result: GamingResult = this.gamingResults[0];
        if(result.home_team.id === this.fetchDataService.idSelectTeam) {
            this.displayTeam.teamData = result.home_team;
            this.displayTeam.id = result.home_team.id;
            this.displayTeam.teamData.imageUrl = "https://interstate21.com/nba-logos/"+result.home_team.abbreviation+".png";
        } else {
            this.displayTeam.teamData = result.visitor_team;
            this.displayTeam.id = result.visitor_team.id;
            this.displayTeam.teamData.imageUrl = "https://interstate21.com/nba-logos/"+result.visitor_team.abbreviation+".png";
        }
        for(let i = 0; i < this.gamingResults.length; i++) {
            console.log(this.gamingResults[i]);
            if(this.gamingResults[i].home_team.id === this.fetchDataService.idSelectTeam) {
                if(this.gamingResults[i].home_team_score - this.gamingResults[i].visitor_team_score < 0) {
                    this.currentScoreList.push("LOST");
                } else if(this.gamingResults[i].home_team_score - this.gamingResults[i].visitor_team_score > 0) {
                    this.currentScoreList.push("WON");
                } else {
                    this.currentScoreList.push("EQUAL");
                }
                //(this.gamingResults[i].home_team_score - this.gamingResults[i].visitor_team_score) < 0 ? this.currentScoreList.push("LOST") : this.currentScoreList.push("WON");
                this.currentScoreValue += this.gamingResults[i].home_team_score;
            } else {
                if(this.gamingResults[i].visitor_team_score - this.gamingResults[i].home_team_score < 0) {
                    this.currentScoreList.push("LOST");
                } else if(this.gamingResults[i].visitor_team_score - this.gamingResults[i].home_team_score > 0) {
                    this.currentScoreList.push("WON");
                } else {
                    this.currentScoreList.push("EQUAL");
                }
                //(this.gamingResults[i].visitor_team_score - this.gamingResults[i].home_team_score) < 0 ? this.currentScoreList.push("LOST") : this.currentScoreList.push("WON");
                this.currentScoreValue += this.gamingResults[i].visitor_team_score;
            }
            this.currentScoreValueBothTeams.push(`${this.gamingResults[i].home_team.abbreviation} ${this.gamingResults[i].home_team_score} -- ${this.gamingResults[i].visitor_team.abbreviation} ${this.gamingResults[i].visitor_team_score}`)
        }
        this.displayTeam.teamData.scoreAverage = Math.round(this.currentScoreValue/this.gamingResults.length);
        this.displayTeam.teamData.scoreBoth = this.currentScoreValueBothTeams;
        this.displayTeam.teamData.scoreList = this.currentScoreList; // assign the values of currentScrollList to displayTeam.teamData.scoreList
        this.fetchDataService.displayTeamList.push(this.displayTeam);
        this.displayTeamList = this.fetchDataService.displayTeamList;
        //console.log(this.displayTeamList);
        this.initializeDisplayTeam();
    }

    initializeDisplayTeam(): void {
        this.currentScoreList = [];
        this.currentScoreValue = 0;
        this.currentScoreValueBothTeams = [];
        this.displayTeam = {
            id: null, 
            teamData: {
                abbreviation: "",
                city: "",
                conference: "",
                division: "",
                full_name: "",
                id: null,
                name: "",
                imageUrl: "",
                scoreList: [],
                scoreAverage: null,
                scoreBoth: []
            }
        };
        
    }

    checkIfTeamExists(id:number): boolean {
        for(let i:number = 0; i < this.fetchDataService.displayTeamList.length; i++) {
            if(this.fetchDataService.displayTeamList[i].id === id) {
                return true;
            } else {
                if(i === this.fetchDataService.displayTeamList.length -1) {
                    return false
                }
                continue;
            }
        }
    }

    onRemoveItem(id: number) {
        this.fetchDataService.removeItem(id);
        console.log(this.displayTeamList);
        console.log(this.fetchDataService.displayTeamList)
    }
}
