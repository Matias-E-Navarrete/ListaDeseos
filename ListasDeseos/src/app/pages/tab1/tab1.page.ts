import { Component } from '@angular/core';
import { ComprasService } from '../../services/compras.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ListaCompra } from '../../models/lista-compra.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listas: any[] = [];
  
  constructor(public servicioCompras: ComprasService, private router: Router, private alertController: AlertController) {
    this.listas = servicioCompras.listas;
    this.servicioCompras.cargarStorage();

  }

  async agregarLista() {

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
            if (data.titulo.length === 0) {
              return;
            }
            const id = this.servicioCompras.crearLista(data.titulo);
            this.router.navigateByUrl(`tabs/tab1/agregar/${id}`);
          }
        },
      ]
    });

    await alert.present();
  }


}
