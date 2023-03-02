import { Language } from './../models/language';
import { Licence } from './../models/licence';
import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { map, Observable } from "rxjs";
import { Filter } from 'src/models/filter';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiEndpoint = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getLicences(filter?: Filter): Observable<Licence[]> {
    const params = new HttpParams({
      fromObject: { ...filter }
    });

    return this.httpClient.get<Licence[]>(`${this.apiEndpoint}/licences`, { params });
  }

  getLanguages(filter?: Filter): Observable<Language[]> {
    const params = new HttpParams({
      fromObject: { ...filter }
    });

    return this.httpClient.get<{ LANGUAGE: string; total_bytes: number }[]>(`${this.apiEndpoint}/languages`, { params })
      .pipe(map(languages => {
        return languages.map(language => {
          return {
            language: language.LANGUAGE,
            totalBytes: language.total_bytes
          }
        })
      }));
  }
}
