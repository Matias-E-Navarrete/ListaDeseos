import { CompraItem } from './compra-item.model';



export class ListaCompra{

    id: number;
    titulo: string;
    fechaCreacion: Date;
    fechaTerminada: Date;
    terminada: boolean;
    items: CompraItem[];


    constructor( titulo: string ){

        this.id = new Date().getTime();
        this.titulo = titulo;
        this.fechaCreacion = new Date();
        this.terminada = false;
        this.items = [];

    }
}
