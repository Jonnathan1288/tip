import { Component, OnInit } from '@angular/core';
import { Cuenta } from 'src/app/model/cuenta';
import { OauthService } from '../../../service/oauth.service';

//Implementadion del err de la API de prime..
import { MessageService } from 'primeng/api';

//import del script
import { LoadScript } from '../../../scripts/load-script';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      :host ::ng-deep .p-password input {
        width: 15rem;
      }
    `,
  ],
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  //import de la clase cuenta
  public user: Cuenta = new Cuenta();

  errorMessage = '';

  constructor(
    private scriptC: LoadScript,
    private oauthService: OauthService,
    private messageService: MessageService
  ) {
    //script que estoy creando par hacer el uso de la password visible y no..
    scriptC.Cargar(['login_eye']);
  }

  ngOnInit(): void {
    // this.user.persona?.id_persona;
  }

  public signInUser() {
    
    this.oauthService
      .signIn(this.user.usuario ?? '', this.user.contrasenia ?? '')
      .subscribe(
        (data: any) => {
          console.log(data);
          if (data != null) {
            this.showSuccess();
            localStorage.setItem('id_persona', String(data.persona.id_persona));
            localStorage.setItem('foto', String(data.persona.foto));
            localStorage.setItem('rol', String(data.rol));
            localStorage.setItem('username', String(data.usuario));
            location.replace('/welcome');
          } else {
            alert('err');
          }
        },
        (err) => {
          let errorCode: any;
       
          errorCode = err.status;
          this.errorMessage = err.error;
          console.log(errorCode, this.errorMessage);
          
          //vamos implementar el switch para capturar los valores de los respectivos errores..
          switch(errorCode){
            case 404:
              this.showError();
              break;
            case 401:
              this.showWarn();    
            break;
            case 409:
              this.showInfo();    
            break;
          }
           //alert(errorCode);
        }
      );
  }

  //Implementacion de los errores mandados por el servidor.. ID:01
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Ingreso al sistema satisfactoriamente',
    });
  }

  showInfo() {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: this.errorMessage,
    });
  }

  showWarn() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: this.errorMessage,
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: this.errorMessage,
    });
  }

  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }
  //fin de la Implementacion de los errores mandados por el servidor.. ID:01
}
