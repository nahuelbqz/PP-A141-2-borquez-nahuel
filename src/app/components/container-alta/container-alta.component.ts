import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EntidadesService } from '../../services/entidades.service';
import { ContainerInterface } from '../../interfaces/container';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-container-alta',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './container-alta.component.html',
  styleUrl: './container-alta.component.css',
})
export class ContainerAltaComponent {
  @Output() PasamosUnContainer: EventEmitter<ContainerInterface> =
    new EventEmitter<ContainerInterface>();

  listadoContainers: ContainerInterface[] = [];
  nuevoContainer: ContainerInterface = {
    codigo: 0,
    empresa: '',
    capacidad: 0,
  };

  forma!: FormGroup;
  formBuilder = inject(FormBuilder);
  entidadesService = inject(EntidadesService);

  ngOnInit(): void {
    this.forma = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.min(100)]],
      empresa: ['', Validators.required],
      capacidad: ['', [Validators.required, Validators.min(1)]],
    });
  }

  agregarContainer() {
    if (!this.forma.invalid) {
      this.nuevoContainer.codigo = this.forma.getRawValue().codigo;
      this.nuevoContainer.empresa = this.forma.getRawValue().empresa;
      this.nuevoContainer.capacidad = this.forma.getRawValue().capacidad;
      this.entidadesService.crearContainer(this.nuevoContainer);

      this.PasamosUnContainer.emit(this.nuevoContainer);

      this.nuevoContainer = {
        codigo: 0,
        empresa: '',
        capacidad: 0,
      };

      this.forma.reset();
      console.log('AGREGADO CON EXITO');
    } else {
      console.log('FORM INVALIDO');
    }
  }
}
