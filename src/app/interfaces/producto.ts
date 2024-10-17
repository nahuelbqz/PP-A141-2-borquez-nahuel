export interface ProductoInterfaceId extends ProductoInterface {
  id: string;
}
export interface ProductoInterface {
  codigo: number;
  descripcion: string;
  precio: number;
  stock: number;
  paisOrigen: any;
}
