import { Injectable } from "@angular/core";
import { AlertButton, AlertController, LoadingController } from "@ionic/angular";

@Injectable({
 providedIn: 'root'
})
export class LoaderService{
    loader: any = undefined;
    constructor(private loadingCtrl: LoadingController){
    }

    public async startLoading(message?: string){
         this.loader = await this.loadingCtrl.create({
            message: message || 'Loading...',
            spinner: 'circular',
          });
          this.loader.present();
          this.loader.dismiss();
    }

    public async stopLoading(){
        return await this.loader?.dismiss();
    }
}