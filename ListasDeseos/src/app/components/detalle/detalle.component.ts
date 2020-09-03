import { Component, OnInit, Input } from '@angular/core';
import { ComprasService } from '../../services/compras.service';
import { ListaCompra } from '../../models/lista-compra.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() flag = false;
  
  lista: ListaCompra;
  total = 0;

  constructor(public servicioCompra: ComprasService, private route: ActivatedRoute) {
    const idLista = this.route.snapshot.paramMap.get('id');
    this.lista = this.servicioCompra.getLista(idLista);
    for (const item of this.lista.items) {
      if (item.precioTotal && item.completado) {
        this.total += item.precioTotal;
      } else if (item.precioTotal > 0 && !item.completado) {
        this.total -= item.precioTotal;
      }
    }
  }


  ngOnInit() { 
    
  }

}
