import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ORG_NAME } from 'src/assets/org-name';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard-page.html',
  styleUrls: ['dashboard-page.scss']
})
export class DashboardPage {
  orgName = ORG_NAME;
  constructor(private _http: HttpClient) {
    
  }

  ionViewWillEnter(){

  }

}
