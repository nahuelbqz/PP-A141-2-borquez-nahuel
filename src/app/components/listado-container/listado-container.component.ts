import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  ContainerInterface,
  ContainerInterfaceId,
} from '../../interfaces/container';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EntidadesService } from '../../services/entidades.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-listado-container',
  standalone: true,
  imports: [NgFor],
  templateUrl: './listado-container.component.html',
  styleUrl: './listado-container.component.css',
})
export class ListadoContainerComponent {
  @Output() PasamosUnContainer: EventEmitter<ContainerInterfaceId> =
    new EventEmitter<ContainerInterfaceId>();

  listadoContainers: ContainerInterfaceId[] = [];
  user: any = null;

  authService = inject(AuthService);
  entidadesService = inject(EntidadesService);

  async ngOnInit() {
    // con observ
    // this.entidadesService.getContainers().subscribe((containers) => {
    //   this.listadoContainers = containers; // Asegurarse de que los contenedores tengan el campo 'id'
    // });
    
    // Usamos await para esperar a que getContainers() devuelva los datos
    this.listadoContainers = await this.entidadesService.getContainers();
  }

  enviarContainer(event: any) {
    this.PasamosUnContainer.emit(event);
  }
}
