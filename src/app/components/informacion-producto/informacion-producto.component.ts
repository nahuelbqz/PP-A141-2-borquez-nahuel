import { Component, Input } from '@angular/core';
import { ProductoInterface } from '../../interfaces/producto';

@Component({
  selector: 'app-informacion-producto',
  standalone: true,
  imports: [],
  templateUrl: './informacion-producto.component.html',
  styleUrl: './informacion-producto.component.css',
})
export class InformacionProductoComponent {
  @Input() productoRecibido?: ProductoInterface;
}
