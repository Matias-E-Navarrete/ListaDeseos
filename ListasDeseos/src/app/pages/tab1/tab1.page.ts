import { Component } from '@angular/core';
import { ComprasService } from '../../services/compras.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listas: any[] = [];
  constructor(public servicioCompras: ComprasService, private router: Router, private alertController: AlertController) {

    this.listas = servicioCompras.listas;

  }

  async agregarLista() {

    //this.router.navigateByUrl('tabs/tab1/agregar');

    const alert = await this.alertController.create({
      header: 'Nueva Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data) => {
            if ( data.titulo.length === 0) {
              return;
            }
            this.servicioCompras.crearLista( data.titulo );
          }
        },
      ]
    });

    await alert.present();
  }

}
