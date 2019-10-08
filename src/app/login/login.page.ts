import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public userLogin: User = {}

  constructor(private router: Router,
    public loadingController: LoadingController) { }

  doLogin(){
    this.loadingController.create({
      message: 'Logando ...',
      duration: 3000
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        //Acessamos a aplicação
        this.router.navigateByUrl("tabs");
      })
    });
  }

  ngOnInit() {
  }

}
