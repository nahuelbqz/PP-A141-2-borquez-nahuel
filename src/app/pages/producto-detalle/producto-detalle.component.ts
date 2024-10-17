import { Component } from '@angular/core';
import { ProductoInterface } from '../../interfaces/producto';
import { ListadoProductosComponent } from '../../components/listado-productos/listado-productos.component';
import { InformacionProductoComponent } from '../../components/informacion-producto/informacion-producto.component';
import { InformacionPaisComponent } from '../../components/informacion-pais/informacion-pais.component';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [
    ListadoProductosComponent,
    InformacionProductoComponent,
    InformacionPaisComponent,
  ],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css',
})
export class ProductoDetalleComponent {
  productoActivo: ProductoInterface = {
    codigo: 0,
    descripcion: '',
    precio: 0,
    stock: 0,
    paisOrigen: {},
    // comestible: false,
  }; // Inicializando como objeto basado en la interfaz

  tomarProductoSeleccionado($event: any) {
    this.productoActivo = $event;
    console.log(this.productoActivo);
  }
}
