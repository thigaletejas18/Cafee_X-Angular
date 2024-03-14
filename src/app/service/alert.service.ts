import { Injectable } from "@angular/core";
import { AlertButton, AlertController } from "@ionic/angular";

@Injectable({
 providedIn: 'root'
})
export class AlertService{
    alert: any = undefined;
    constructor(private alertCtrl: AlertController){
    }

    public async openAlert(header: string, message: string, buttons?: AlertButton[], subHeader?: string){
         this.alert = await this.alertCtrl.create({
            header: header,
            subHeader: subHeader,
            message: `${message}.`,
            buttons: buttons,
          });
          return await this.alert.present();
    }

    public async closeAlert(){
        return this.alert?.dismiss();
    }
}