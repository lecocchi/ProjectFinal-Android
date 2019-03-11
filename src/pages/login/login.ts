import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { HomePage } from "../home/home";
import { UserProvider } from '../../providers/user/user';
import { UtilsProvider } from '../../providers/utils/utils';
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  rootPage = HomePage;
  userName:string;
  password:string;
  userInfo:any = {};
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public userProvider: UserProvider,
              public utilProvider: UtilsProvider,
              private storage: Storage,
              public platform:Platform,
              private gp: GooglePlus) {

  }

  goToOtherPage() {
    this.navCtrl.push(HomePage);
  }

  loginForUserAndPass(){
    let user = {
      "user_name" : this.userName,
      "password" : this.password
    }

    this.userProvider.loginForUserAndPass(user)
      .subscribe((u:any) => {

        this.storage.remove("id");
        this.storage.remove("email");
        this.storage.remove("firstName");
        this.storage.remove("lastName");
        this.storage.remove("rol");
        this.storage.remove("userName");
        this.storage.remove("leandro");

        this.storage.set("id", u.id);
        this.storage.set("email", u.email);
        this.storage.set("firstName", u.firstName);
        this.storage.set("lastName", u.lastName);
        this.storage.set("rol", u.rol);
        this.storage.set("userName", u.userName);
        this.storage.set("isNetwork", u.isNetwork);

        this.navCtrl.push(this.rootPage, {"rol": u.rol});
      },
      (err) => {
        this.utilProvider.presentPrompt(err.error.title, err.error.message);
      })
  }

  loginGP(){

    if(this.platform.is('cordova')){
      this.gp.login({}).then(res =>{

        let userLoginGooglePlus = {
          "email":res.email
        }

        this.userProvider.loginForGooglePlus(userLoginGooglePlus)
          .subscribe( (u:any) =>{
            this.storage.remove("id");
            this.storage.remove("email");
            this.storage.remove("firstName");
            this.storage.remove("lastName");
            this.storage.remove("rol");
            this.storage.remove("userName");
    
            this.storage.set("id", u.id);
            this.storage.set("email", u.email);
            this.storage.set("firstName", u.firstName);
            this.storage.set("lastName", u.lastName);
            this.storage.set("rol", u.rol);
            this.storage.set("userName", u.userName);
            this.storage.set("isNetwork", u.isNetwork);
    
            this.navCtrl.push(this.rootPage, {"rol": u.rol});
          },
          (err) =>{
            this.gp.logout().then((res)=>{});
            this.utilProvider.presentPrompt(err.error.title, err.error.message);
          })
      }).catch(err => console.log(err));
    }else{
      console.log("Not cordova");
    }
  }

}
