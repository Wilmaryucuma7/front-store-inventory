import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreInventoryService {

  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': localStorage.getItem('token') ?? '' });
  }

  // loginUser(userForm: any) {
  //   return this.http.post<any>(`${envi}`)
  // }

  logOut() {
    localStorage.clear();
    window.location.href = '/';
  }
}
