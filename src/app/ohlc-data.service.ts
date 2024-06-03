import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OhlcDataService {
  private jsonUrl = 'assets/ohlc-data.json';

  constructor(private http: HttpClient) {}

  getOhlcData(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }
}
