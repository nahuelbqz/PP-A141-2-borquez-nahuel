import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css',
})
export class BienvenidaComponent {
  private http = inject(HttpClient);
  data: any = null;

  ngOnInit(): void {
    this.http
      .get('https://api.github.com/users/nahuelbqz')
      .subscribe((res: any) => {
        this.data = res;
      });
  }
}
