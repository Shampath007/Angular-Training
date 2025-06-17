import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttproutingService {
  apiUrl=environment.apiUrl;
  apiurl=environment.apiurl;
  constructor(private http:HttpClient) { }
  getMethod(url: string){
    return this.http.get(this.apiUrl+url);
  }
  postMethod(url: string, body: any, header:any){
    return this.http.post(this.apiUrl+url,body,header);
  }
  patchMethod(url:string,body:any){
    return this.http.patch(this.apiurl+url,body);
  }
  deleteMethod(url: string) {
    return this.http.delete(this.apiurl + url);
  }
  getJsonData(url:string){
    return this.http.get(url);
  }
  
}
