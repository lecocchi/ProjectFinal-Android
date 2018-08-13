import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {SprintProvider} from "../../providers/sprint/sprint";
import {SprintPage} from "../sprint/sprint";

@Component({
  selector: 'page-sprint',
  templateUrl: 'sprints.html',
})
export class SprintsPage {

  sprints:any = [];
  sprintPage:any = SprintPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public sprintProvider:SprintProvider,
              public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {

    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Cargando...'
    });

    loading.present();


    setTimeout(()=>{
      this.sprintProvider.getAllSprints()
        .subscribe( s =>{
          this.sprints = s;
          this.sprints.reverse();
          loading.dismiss();
        })
    }, 1000);


  }

  createSprint(){
    this.navCtrl.push(this.sprintPage);
  }

}
