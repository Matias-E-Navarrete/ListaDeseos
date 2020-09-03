import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ComprasService } from '../../services/compras.service';
import { ListaCompra } from '../../models/lista-compra.model';
import { AlertController, IonList } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild(IonList) vLista: IonList;
  @Input() terminada: boolean;

  constructor(public servicioCompras: ComprasService, private router: Router, private alertController: AlertController) { }

  ngOnInit() { }


  agregarItem(lista: ListaCompra) {

    if (this.terminada) {
      this.router.navigateByUrl(`tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`tabs/tab1/agregar/${lista.id}`);
    }
  }
  borrarLista(id: number) {
    this.servicioCompras.listas.splice(id, 1);
    this.servicioCompras.guardarStorage();
  }

  async editarLista(lista: ListaCompra) {
    const alert = await this.alertController.create({
      header: 'Editar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.vLista.closeSlidingItems();
          }
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            if (data.titulo.length === 0) {
              return;
            }
            lista.titulo = data.titulo;
            this.servicioCompras.guardarStorage();
            this.vLista.closeSlidingItems();

          }
        },
      ]
    });

    await alert.present();
  }

}
