import { NgFor } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  ProductoInterface,
  ProductoInterfaceId,
} from '../../interfaces/producto';
import { EntidadesService } from '../../services/entidades.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-productos',
  standalone: true,
  imports: [NgFor],
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.css',
})
export class ListadoProductosComponent {
  @Output() PasamosUnProducto: EventEmitter<ProductoInterface> =
    new EventEmitter<ProductoInterface>();

  listadoProductos: ProductoInterface[] = [];

  entidadesService = inject(EntidadesService);

  async ngOnInit() {
    //TRAER PRODUCTOS
    this.listadoProductos = await this.entidadesService.traerProductos();
  }

  pasarProducto(event: any) {
    this.PasamosUnProducto.emit(event);
  }
}
