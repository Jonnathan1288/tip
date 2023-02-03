import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API_URI = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getAll(){
    return this.http.get(API_URI+'/cuentauser/listarcuenta')
  }
}
