import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-informacion-pais',
  standalone: true,
  imports: [],
  templateUrl: './informacion-pais.component.html',
  styleUrl: './informacion-pais.component.css'
})
export class InformacionPaisComponent {
  @Input() paisRecibido?: any;

  constructor() { }

  ngOnInit(): void {
  }

}
