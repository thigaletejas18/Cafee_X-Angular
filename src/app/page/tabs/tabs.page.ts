import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SERVER_API_URL } from 'src/environments/server-api-url';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private _http: HttpClient) {
    
  }

}
