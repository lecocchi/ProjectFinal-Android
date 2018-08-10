import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SprintProvider} from "../../providers/sprint/sprint";
import {UtilsProvider} from "../../providers/utils/utils";

@Component({
  selector: 'page-sprint',
  templateUrl: 'sprint.html',
})
export class SprintPage {
  from:Date;
  to:Date;
  name:string;
  description:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public  sprintProvider:SprintProvider, public utilsProvider:UtilsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SprintPage');
  }

  accept(){

    if (this.name == undefined) {
      this.utilsProvider.presentToast("Falta ingresar el 'NOMBRE' del sprint")
    }else if(this.from == undefined) {
      this.utilsProvider.presentToast("Falta ingresar la fecha 'DESDE' del sprint")
    } else if(this.to == undefined){
      this.utilsProvider.presentToast("Falta ingresar la fecha 'HASTA' del sprint")
    }else{

      let fromDate:string[] = this.from.toString().split("-");
      let toDate:string[] = this.to.toString().split("-");

      let sprint = {
        "name":this.name,
        "description":this.description,
        "date_from": new Date(fromDate[1] + "/" + fromDate[2] +  "/" + fromDate[0]).getTime(),
        "date_to": new Date(toDate[1] + "/" + toDate[2] +  "/" + toDate[0]).getTime(),
      }

      this.sprintProvider.createSprint(sprint)
        .subscribe( s =>{
          this.utilsProvider.presentToast("Se ha generado el sprint  con éxito");
          this.cancel();
        })

    }

  }

  cancel(){
    this.navCtrl.pop();
  }

}
