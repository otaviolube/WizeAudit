import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public userLogin: User = {}
  private loading: any;

  constructor(private router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private authService: AuthService) { }

  async doLogin() {
    await this.presentLoading();
    try {
      console.log(this.userLogin);
      await this.authService.login(this.userLogin);
    } catch (error) {
      let message: string;
      switch (error.code) {
        case "auth/wrong-password":
          message: "Usuário ou senha incorretos!";
          break;
        case "auth/user-not-found":
          message: "Usuário não encontrado!";
          break;
        default:
          message: "Ocorreu um erro na autenticação!"
          break;
      }
      console.log(error);
      this.presentToast(message);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: "Logando ..."
    })
    return this.loading.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
  }

}
