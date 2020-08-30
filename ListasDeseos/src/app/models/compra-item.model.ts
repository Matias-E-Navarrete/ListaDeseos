

export class CompraItem {

    id: number;
    fechaCreacion: Date;
    descripcion: string;
    precioUnitario: number;
    precioTotal: number;
    cantidad: number;
    completado: boolean;

    constructor(descripcion: string, precio?: number, cantidad?: number) {
        this.id = new Date().getTime();
        this.descripcion = descripcion;
        this.fechaCreacion = new Date();
        this.completado = false;
    }
    
    public setPrecio(precio: number, cantidad?: number) {
        this.precioUnitario = precio;
        if (cantidad) {
            this.cantidad = cantidad;
        } else {
            this.cantidad = 1;
        }
        return this.precioTotal = cantidad * precio;
    }

}
