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
  selector: 'app-container-modificacion',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './container-modificacion.component.html',
  styleUrl: './container-modificacion.component.css',
})
export class ContainerModificacionComponent {
  @Input() containerAModificar?: ContainerInterfaceId;

  containerModif: ContainerInterfaceId = {
    id: '',
    codigo: 0,
    color: '',
    empresa: '',
    capacidad: 0,
  };
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

  modificarContainer(containerId?: string) {
    if (!this.forma.invalid) {
      this.containerModif.codigo = this.forma.getRawValue().codigo;
      this.containerModif.color = this.forma.getRawValue().color;
      this.containerModif.empresa = this.forma.getRawValue().empresa;
      this.containerModif.capacidad = this.forma.getRawValue().capacidad;

      if (containerId) {
        this.entidadesService
          .modificarContainer(containerId, this.containerModif)
          .then(() => console.log('Container modificado'))
          .catch((error) =>
            console.error('Error al modificar el container: ', error)
          );
      } else {
        console.error('Error: containerId es undefined');
      }

      this.containerModif = {
        id: '',
        codigo: 0,
        color: '',
        empresa: '',
        capacidad: 0,
      };
      this.forma.reset();
    } else {
      console.log('FORM INVALIDO');
    }
  }
}
