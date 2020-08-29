import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  constructor( private alertController: AlertController) { }

  ngOnInit() {
  }

  async agregarPrecio(){
    const alert = await this.alertController.create({
      header: 'Precio',
      inputs: [
        {
          name: 'precio',
          type: 'number',
          placeholder: '$'
        },
        {
          name: 'cantidad',
          type: 'number',
          placeholder: 'Cantidad'
        },
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
            console.log('Objeto');
          }
        },
      ]
    });

    await alert.present();
  }

}
