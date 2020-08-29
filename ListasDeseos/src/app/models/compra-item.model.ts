

export class CompraItem {

    id: number;
    fechaCreacion: Date;
    descripcion: string;
    precioUnitario: number;
    precioTotal: number;
    cantidad: number;

    constructor(descripcion: string, precio?: number, cantidad?: number) {
        this.id = new Date().getTime();
        this.descripcion = descripcion;
        if (precio != null) {
            this.precioUnitario = precio;
        }
        this.fechaCreacion = new Date();
        if ( cantidad > 0){
            this.cantidad = cantidad;
        }else {
            this.cantidad = 1;
        }

    }

    calculaTotal(){
        this.precioTotal = this.cantidad * this.precioUnitario;
    }

}
