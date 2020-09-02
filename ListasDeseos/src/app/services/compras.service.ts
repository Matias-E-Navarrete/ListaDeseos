import { Injectable } from '@angular/core';
import { ListaCompra } from '../models/lista-compra.model';
import { literalArr } from '@angular/compiler/src/output/output_ast';

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

    return lista.id;
  }

  getLista(id: number | string) {
    id = Number(id);
    return this.listas.find(listaData => listaData.id === id);
  }

  guardarStorage() {

    localStorage.setItem('data', JSON.stringify(this.listas));

  }

  cargarStorage() {

    if (localStorage.getItem('data')) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    }
  }

}

