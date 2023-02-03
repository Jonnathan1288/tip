import { Component, OnInit } from '@angular/core';
import { Cuenta } from 'src/app/model/cuenta';
import { Persona } from 'src/app/model/persona';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  cuenta: any[] = [];

  first = 0;

  rows = 10;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.getAllUser();
  }

  public getAllUser(){
    this.userService.getAll().subscribe((data: any)=>{
      this.cuenta = data;
    })
    //this.userService.getAll().subscribe((data)=> (this.cuenta = data as Cuenta[]))
  }

  //Implementacion de la tabla de todo referente a primeng
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.cuenta
      ? this.first === this.cuenta.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.cuenta ? this.first === 0 : true;
  }
  // fin de los metodos de la tabla de primeng
}
