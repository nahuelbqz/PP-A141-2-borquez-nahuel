import { Component, inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ContainerInterface,
  ContainerInterfaceId,
} from '../../interfaces/container';
import { EntidadesService } from '../../services/entidades.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-container-eliminar',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './container-eliminar.component.html',
  styleUrl: './container-eliminar.component.css',
})
export class ContainerEliminarComponent {
  @Input() containerAEliminar?: ContainerInterfaceId;

  containerElim: ContainerInterfaceId = {
    id: '',
    codigo: 0,
    color: '',
    empresa: '',
    capacidad: 0,
  }; // Inicializando como objeto basado en la interfaz
  entidadesService: EntidadesService = inject(EntidadesService);

  //@ts-ignore
  forma: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.forma = this.formBuilder.group({
      codigo: ['', Validators.required],
      color: ['', Validators.required],
      empresa: ['', Validators.required],
      capacidad: ['', Validators.required],
    });
  }

  // ver como solucionar Error: containerId es undefined
  eliminarContainer(containerId?: string) {
    if (containerId) {
      this.entidadesService
        .eliminarContainer(containerId)
        .then(() => console.log('Container eliminado'))
        .catch((error) =>
          console.error('Error al eliminar el container: ', error)
        );
    } else {
      console.error('Error: containerId es undefined');
    }
  }
}
