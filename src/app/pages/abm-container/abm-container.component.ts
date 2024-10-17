import { Component, inject } from '@angular/core';
import { ContainerAltaComponent } from '../../components/container-alta/container-alta.component';
import { ContainerModificacionComponent } from '../../components/container-modificacion/container-modificacion.component';
import { ContainerEliminarComponent } from '../../components/container-eliminar/container-eliminar.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EntidadesService } from '../../services/entidades.service';
import {
  ContainerInterface,
  ContainerInterfaceId,
} from '../../interfaces/container';
import { ListadoContainerComponent } from '../../components/listado-container/listado-container.component';

@Component({
  selector: 'app-abm-container',
  standalone: true,
  imports: [
    ContainerAltaComponent,
    ContainerModificacionComponent,
    ContainerEliminarComponent,
    ListadoContainerComponent,
  ],
  templateUrl: './abm-container.component.html',
  styleUrl: './abm-container.component.css',
})
export class AbmContainerComponent {
  containerRecibido: ContainerInterfaceId = {
    id: '',
    codigo: 0,
    empresa: '',
    capacidad: 0,
  };

  entidadesService = inject(EntidadesService);

  ngOnInit(): void {
    // this.listadoContainers = this.entidadesService.traerContainers();
    // this.entidadesService.getContainers().subscribe((data) => {
    //   this.listadoContainers = data;
    // });
  }

  //el del ALTA
  tomarContainerEnviado($event: any) {
    console.log($event);
  }

  tomarContainerActivo($event: any) {
    console.log($event);
    this.containerRecibido = $event;
  }
}
