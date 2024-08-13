import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environments } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  apiURL: any;
  
  constructor(private http: HttpClient) { 
    this.apiURL = environments.apiURL;
  }

  // code for setting header 
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Response-Type': 'json',
  //   }),
  // };

  // Set HTTP request params
  setParams(params: any) {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(function (key) {
      if (params[key]) httpParams = httpParams.append(key, params[key]);
    });
    return httpParams;
  }

  // HttpClient API get() method 
  getData(url: any, args?: any): Observable<any> {
    let params: any;
    if (args) {
      params = this.setParams(args);
    } else {
      params = new HttpParams();
    }
    return this.http.get<any>(this.apiURL + url , { params }).pipe(
      // retry(1),
      catchError(this.handleError)
    );
  }

  // HttpClient API post() method 
  postData(url: any, data: any, args?: any): Observable<any> {
    let params: any;
    let submissionURl:boolean=false;
    if(url=="/api/v1/submissions"){
      submissionURl=true;
      console.log("yess");
    }
    if (args) {
      params = this.setParams(args);
    } else {
      params = new HttpParams();
    }
    return this.http.post<any>((submissionURl?environments.submissionUrl:this.apiURL) + url, data, { params }).pipe(
      // retry(1),
      catchError(this.handleError)
    );
  }

  // HttpClient API put() method 
  putData(url: any, data?: any, args?: any): Observable<any> {
    let params: any;
    if (args) {
      params = this.setParams(args);
    }
    else {
      params = new HttpParams();
    }
    return this.http.put<any>(this.apiURL + url, data, { params }).pipe(
      catchError(this.handleError)
    );
  }

  // HttpClient API delete() method 
  deleteData(url: any, data: any, args?: any): Observable<any> {
    let params: any;
    if (args) {
      params = this.setParams(args);
    }
    else {
      params = new HttpParams()
    }
    return this.http.delete<any>(this.apiURL + url, data).pipe(
      catchError(this.handleError)
    )
  }

  // Error handling function 
  handleError(error: any) {
    // debugger
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

  // check JSON or Not
  isJson(str: any) {
    try {
      // return true
      JSON.parse(str);
      // return true
    } catch (e) {
      return false;
    }
    return true;
  }
}
