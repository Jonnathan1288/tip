import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Persona } from '../model/persona';
import { Cuenta } from '../model/cuenta';

const API_URI = 'http://localhost:8080/api';
@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(private http: HttpClient) { }

  //Metodo que nos va servir para acceder al sistema..
  // public signIn(nuser: string, password: string){
  //   return this.http.get(API_URI+'/signIn/getuser/'+nuser+'/'+password);
  // }


  public signIn(nuser: string, password: string) {
    return this.http.get<any>(API_URI + '/signIn/getuser/' + nuser + '/' + password);
  }

  public registerUser(persona: Persona){
    return this.http.post(API_URI+'/registerData/saveUser', persona);
  }

  public signUp(user: Cuenta){
    return this.http.post(API_URI+'/signUp/saveUser', user);
  }

  public checkUser(username: string){
    return this.http.get(API_URI+'/oauth/searchByUser/'+username);
  }
}
