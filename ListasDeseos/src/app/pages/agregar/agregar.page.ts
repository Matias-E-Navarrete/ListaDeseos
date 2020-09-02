import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonList } from '@ionic/angular';
import { ComprasService } from '../../services/compras.service';
import { ActivatedRoute } from '@angular/router';
import { ListaCompra } from '../../models/lista-compra.model';
import { CompraItem } from 'src/app/models/compra-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  @ViewChild(IonList) vLista: IonList;
  lista: ListaCompra;
  nombreItem: string;
  checked = false;
  items: CompraItem[];




  constructor(private servicioCompras: ComprasService, private alertController: AlertController, private route: ActivatedRoute) {

    const idLista = this.route.snapshot.paramMap.get('id');
    this.lista = this.servicioCompras.getLista(idLista);
    this.items = this.lista.items;
  }

  ngOnInit() {
  }


  cambiaCheck(item: ListaCompra) {

    const pendientes = this.lista.items.filter(dataItems => !dataItems.completado).length;

    if (pendientes === 0) {
      this.lista.terminada = true;
      this.lista.fechaTerminada = new Date();
    } else {
      this.lista.terminada = false;
      this.lista.fechaTerminada = null;
    }
    this.servicioCompras.guardarStorage();

  }

  borrarItem(id: number) {
    this.lista.items.splice(id, 1);
    this.servicioCompras.guardarStorage();
  }

  async comprado(item) {
    if (!item.completado === true) {
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
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              this.vLista.closeSlidingItems();
            }
          },
          {
            text: 'Aceptar',
            handler: (data) => {
              const precio = Number(data.precio);
              let cantidad;
              if (data.cantidad) {
                cantidad = Number(data.cantidad);
              } else {
                cantidad = 1;
              }
              item.precioUnitario = precio;
              item.cantidad = cantidad;
              item.precioTotal = cantidad * precio;
              this.servicioCompras.guardarStorage();
              this.vLista.closeSlidingItems();
            }
          },
        ]
      });

      await alert.present();
    }
  }



  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    }
    const nuevoItem = new CompraItem(this.nombreItem);
    nuevoItem.idLista = this.lista.id;
    this.lista.items.push(nuevoItem);
    this.nombreItem = '';
    this.servicioCompras.guardarStorage();
  }



}
