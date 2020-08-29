import { Injectable } from '@angular/core';
import { ListaCompra } from '../models/lista-compra.model';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  listas: ListaCompra[] = [];

  constructor() { 

    this.cargarStorage();
  }

  crearLista(titulo: string) {
    const lista = new ListaCompra(titulo);
    this.listas.push(lista);
    this.guardarStorage();
  }

  guardarStorage() {

    localStorage.setItem( 'data', JSON.stringify(this.listas) );

  }

  cargarStorage() {

    if( localStorage.getItem( 'data' ) ){
      this.listas = JSON.parse(localStorage.getItem( 'data' ));
    }
  }

}

