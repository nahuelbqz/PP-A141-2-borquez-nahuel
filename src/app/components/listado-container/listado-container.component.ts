import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  ContainerInterface,
  ContainerInterfaceId,
} from '../../interfaces/container';
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
  entidadesService = inject(EntidadesService);

  async ngOnInit() {
    this.listadoContainers = await this.entidadesService.getContainers();
  }

  enviarContainer(event: any) {
    this.PasamosUnContainer.emit(event);
  }
}
