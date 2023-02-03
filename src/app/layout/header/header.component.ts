import { Component, OnInit } from '@angular/core';
import { LoadScript } from 'src/app/scripts/load-script';
import { HttpClient} from "@angular/common/http";
import { Router} from '@angular/router';
//Import de la clase persona..
import {Persona} from '../../model/persona';
import { StorageService } from 'src/app/service/storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  //creacion de objeto de la clase persona;
  userC: Persona = new Persona();

  //variables don de voy recibir el storage para el login
  id_user?: any;
  nombreUser?: any;

  isUserAdmin: boolean = false;
  isUserNormal: boolean= false;

  constructor(
    private httpc: HttpClient,
    private route: Router,
    private storage: StorageService
    
  ){
  }
  ngOnInit(): void {
    this.getUser();
  }

  public getUser(){
    this.id_user = localStorage.getItem('id_cliente');

    if(this.id_user != null){
      
    }
  }

  public signOut(){
    this.storage.clean();
  }
}
