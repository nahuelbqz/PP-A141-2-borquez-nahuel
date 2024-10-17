import { NgFor } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EntidadesService } from '../../services/entidades.service';
import { ProductoInterface } from '../../interfaces/producto';

@Component({
  selector: 'app-lista-prod-publica',
  standalone: true,
  imports: [NgFor],
  templateUrl: './lista-prod-publica.component.html',
  styleUrl: './lista-prod-publica.component.css',
})
export class ListaProdPublicaComponent {
  @Output() PasamosUnProducto: EventEmitter<ProductoInterface> =
    new EventEmitter<ProductoInterface>();

  listadoProductos: ProductoInterface[] = [];
  listaFiltrada: ProductoInterface[] = [];

  entidadesService = inject(EntidadesService);
  authService = inject(AuthService);

  constructor() {}

  async ngOnInit() {
    //TRAER PRODUCTOS
    this.listadoProductos = await this.entidadesService.traerProductos();

    this.listadoProductos.forEach((prod) => {
      if (prod.stock > 0) {
        this.listaFiltrada.push(prod);
      }
    });
  }

  pasarProducto(event: any) {
    this.PasamosUnProducto.emit(event);
  }
}
