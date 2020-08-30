import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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

  async comprado(id) {
    let item = this.items.find(itemData => itemData.id === id);
    //console.log(item);

    if (item.completado === false) {
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
            }
          },
          {
            text: 'Crear',
            handler: (data) => {
              const precio = Number(data.precio);
              const cantidad = Number(data.cantidad);
              const precioTotal = item.setPrecio(precio, cantidad);
              console.log(precioTotal);
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
    this.lista.items.push(nuevoItem);
    this.nombreItem = '';
    this.servicioCompras.guardarStorage();
  }



}
