import { Component } from '@angular/core';
import { FetchDataService } from 'src/app/service/fetch-data.service';

@Component({
    selector: 'app-nba-team',
    templateUrl: './nba-team.component.html',
    styleUrls: ['./nba-team.component.css']
})
export class NbaTeamComponent {
    constructor(private fetchDataService: FetchDataService) {}

    ngOnInit() :void {
        
    }
}
