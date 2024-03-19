import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': localStorage.getItem('token') ?? '' });
  }

  loginUser(userForm: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}users/login`, JSON.stringify(userForm))
  }

  logOut() {
    localStorage.clear();
    window.location.href = '/';
  }
}
