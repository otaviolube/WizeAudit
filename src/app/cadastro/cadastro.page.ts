import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  constructor(private router: Router,
    public loadingController: LoadingController,
    private navController: NavController) { }


  realizarCadastro(){
    this.loadingController.create({
      message: 'Cadastrando ...',
      duration: 3000
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        //Acessamos a aplicação
        this.navController.navigateBack("");
      })
    });
  }
  
  ngOnInit() {
  }

}
