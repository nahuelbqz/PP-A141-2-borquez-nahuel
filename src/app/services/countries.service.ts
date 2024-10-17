import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private http = inject(HttpClient);

  getCountries(){
    return this.http.get('https://restcountries.com/v3.1/lang/spanish?fields=name,flags');
  }
}
