import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SERVER_API_URL } from 'src/environments/server-api-url';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(private _http: HttpClient) {
    
  }

  ionViewWillEnter(){
    this._http.get(`${SERVER_API_URL}ingredient/all`).subscribe((res)=>(console.log(res)));
  }

}
