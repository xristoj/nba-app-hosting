import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeTeam } from '../model/all-teams/home-team';
import { VisitorTeam } from '../model/all-teams/visitor-team';
import { FetchDataService } from '../service/fetch-data.service';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css']
})
export class ResultsComponent {
    displayTeam: HomeTeam | VisitorTeam;

    constructor(private fetchDataService: FetchDataService, private route: ActivatedRoute) {
        this.route.params.subscribe((params) => {
            console.log(this.fetchDataService.displayTeamList);
            for(let i: number = 0; i < this.fetchDataService.displayTeamList.length; i++) {
                if(this.fetchDataService.displayTeamList[i].id === +params.teamCode) {
                    this.displayTeam = this.fetchDataService.displayTeamList[i].teamData;
                    console.log(this.displayTeam)
                    break;
                } else {
                    continue;
                }
            }
        });
    }

    ngOnInit() {

    }
}
