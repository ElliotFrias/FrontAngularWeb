import { Categoria } from './categoria';

export class Producto {
  idProducto: number = 0;
  nombreProducto : string = '';
  descripcionProducto : string = '';
  existencia: number = 0;
  precioProducto: number = 0;
  createAt: string = '';
  idCategoria!: Categoria;
}
