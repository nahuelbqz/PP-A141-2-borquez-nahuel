import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-tabla-paises',
  standalone: true,
  imports: [NgFor],
  templateUrl: './tabla-paises.component.html',
  styleUrl: './tabla-paises.component.css',
})
export class TablaPaisesComponent {
  @Output() PasamosUnPais: EventEmitter<any> = new EventEmitter<any>();
  apiCountries = inject(CountriesService);

  listadoPaises: any;

  ngOnInit(): void {
    this.apiCountries.getCountries().subscribe(
      (data: any) => {
        this.listadoPaises = data;
        console.log(data);
        this.traerPaises();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async traerPaises() {
    this.listadoPaises.sort((a: any, b: any) => {
      return a.name.common.localeCompare(b.name.common);
    });
  }

  pasarPais(pais: any) {
    this.PasamosUnPais.emit(pais);
  }
}
