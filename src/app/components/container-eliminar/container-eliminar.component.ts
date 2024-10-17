import { Component, inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
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
    empresa: '',
    capacidad: 0,
  }; 
  entidadesService: EntidadesService = inject(EntidadesService);
  forma!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.forma = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.min(100)]],
      empresa: ['', Validators.required],
      capacidad: ['', [Validators.required, Validators.min(1)]],
    });
  }

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
