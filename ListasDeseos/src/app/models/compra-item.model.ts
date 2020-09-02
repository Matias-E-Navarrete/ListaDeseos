

export class CompraItem {

    id: number;
    fechaCreacion: Date;
    descripcion: string;
    precioUnitario: number;
    precioTotal: number;
    cantidad: number;
    completado: boolean;
    idLista: number;

    constructor(descripcion: string, precio?: number, cantidad?: number) {
        this.id = new Date().getTime();
        this.descripcion = descripcion;
        this.fechaCreacion = new Date();
        this.completado = false;
    }
    public setPrecio(precio: number, cantidad: number): number {
        this.precioUnitario = precio;
        return this.precioTotal = cantidad * precio;
    }

}
