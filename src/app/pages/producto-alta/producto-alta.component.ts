import { Component, inject, Input } from '@angular/core';
import {
  ProductoInterface,
  ProductoInterfaceId,
} from '../../interfaces/producto';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EntidadesService } from '../../services/entidades.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { TablaPaisesComponent } from '../../components/tabla-paises/tabla-paises.component';

@Component({
  selector: 'app-producto-alta',
  standalone: true,
  imports: [NgIf, TablaPaisesComponent, ReactiveFormsModule],
  templateUrl: './producto-alta.component.html',
  styleUrl: './producto-alta.component.css',
})
export class ProductoAltaComponent {
  @Input() paisForm?: any;

  listadoProductos: ProductoInterfaceId[] = [];
  nuevoProducto: ProductoInterface = {
    codigo: 0,
    descripcion: '',
    precio: 0,
    stock: 0,
    paisOrigen: '',
    // comestible: false,
  }; // Inicializando como objeto basado en la interfaz

  formAlta!: FormGroup;
  formBuilder = inject(FormBuilder);
  entidadesService = inject(EntidadesService);
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.formAlta = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.min(100)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
      paisOrigen: ['', Validators.required],
      // comestible: ['', Validators.required],
    });
  }

  agregarProducto() {
    this.formAlta.setValue({
      codigo: this.formAlta.getRawValue().codigo,
      descripcion: this.formAlta.getRawValue().descripcion,
      precio: this.formAlta.getRawValue().precio,
      stock: this.formAlta.getRawValue().stock,
      paisOrigen: this.formAlta.getRawValue().paisOrigen,
      // comestible: this.formAlta.getRawValue().comestible,
    });

    if (!this.formAlta.invalid) {
      this.nuevoProducto.codigo = this.formAlta.getRawValue().codigo;
      this.nuevoProducto.descripcion = this.formAlta.getRawValue().descripcion;
      this.nuevoProducto.precio = this.formAlta.getRawValue().precio;
      this.nuevoProducto.stock = this.formAlta.getRawValue().stock;

      // const comestibleValue = this.formAlta.getRawValue().comestible;
      // this.nuevoProducto.comestible = comestibleValue === 'si';

      //verificar si no esta repetido el producto
      this.entidadesService.crearProducto(this.nuevoProducto);
      this.nuevoProducto = {
        codigo: 0,
        descripcion: '',
        precio: 0,
        stock: 0,
        paisOrigen: '',
        // comestible: false,
      }; // Reinicio del objeto

      this.formAlta.reset();
      console.log('AGREGADO CON EXITO');
    } else {
      console.log('FORM INVALIDO');
    }
  }

  tomarPaisSeleccionado($pais: any) {
    this.nuevoProducto.paisOrigen = $pais;
    this.formAlta.patchValue({ paisOrigen: $pais.name.common });
  }
}
