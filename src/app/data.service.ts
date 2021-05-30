import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GlobalDataSummary } from "./model";

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private http:HttpClient) { }
  getData():Observable<any>
  {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append(
      'X-RapidAPI-Key',
      'ad7ce30aacmshd3a58c279133529p1d3515jsn273849d3de16'
    );
    return this.http.get(
      `https://covid-19-tracking.p.rapidapi.com/v1`,
       {headers: headers}
     );
  }
}
