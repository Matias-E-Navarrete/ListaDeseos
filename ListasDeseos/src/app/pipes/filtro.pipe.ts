import { Pipe, PipeTransform } from '@angular/core';
import { ListaCompra } from '../models/lista-compra.model';

@Pipe({
  name: 'filtro',
  pure: false
})
export class FiltroPipe implements PipeTransform {

  transform(listas: ListaCompra[], completada: boolean): ListaCompra[] {
    return listas.filter( lista => lista.terminada === completada );
  }

}
