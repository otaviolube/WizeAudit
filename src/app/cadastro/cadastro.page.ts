import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public userRegister: User = {}
  private loading: any;
  
  constructor(private router: Router,
    public loadingController: LoadingController,
    private navController: NavController,
    public toastController: ToastController,
    private authService: AuthService) { }

  async realizarCadastro(){
    await this.presentLoading();
    try{
      console.log(this.userRegister);
      await this.authService.register(this.userRegister);
    }catch(error){
      let message: string;
      switch(error.code){
        case 'auth/email-already-in-use':
          message = "Email já cadastrado!";
          break;
        case 'auth/invalid-email':
          message = "Email inválido!";
          break;
        case 'auth/weak-password':
          message = "A senha deve ter pelo menos 6 caracteres";
          break;
        default:
          message = "Ocorreu um erro no cadastro!";
          break;
      }
      console.log(error); 
      this.presentToast(message);
    }finally{
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: "Cadastrando ..."
    })
    return this.loading.present();
  }

  async presentToast(message: string){
    const toast = await this.toastController.create({
      message,
      duration: 2000
    })
    toast.present();
  }
  
  ngOnInit() {
  }

}
