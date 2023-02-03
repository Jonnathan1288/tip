import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Cuenta } from 'src/app/model/cuenta';
import { Persona } from 'src/app/model/persona';
import { LoadScript } from 'src/app/scripts/load-script';
import { OauthService } from 'src/app/service/oauth.service';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class RegisterComponent implements OnInit {
  //Import de la clase de persona
  public persona: Persona = new Persona();

  public user: Cuenta = new Cuenta();

  //Hacer un Json de la password

  passwordR = {
    passwordU: null,
  };
  //Fin del json

  selectedCity1: any;
  countries: any[] = [];

  constructor(
    private scriptC: LoadScript,
    private authUser: OauthService,
    private changeDetector: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    scriptC.Cargar(['pru']);
  }
  ngOnInit(): void {
    //this.validaUserPass();
    //this.onButtonClick()
  }
  value3?: string;
  value4?: string;

  //Implementacion del evento que captura la imagen del usuario..
  async loadPictureUser(event: any) {
    const file = event.target.files[0];
    try {
      this.persona.foto = await this.convertToBase64(file);
    } catch (error) {
      console.error(error);
    }
  }
  //Fin del metodo que captura la imagen del usuario..

  // Formato para convertir en BASE64
  async convertToBase64(file: File): Promise<string> {
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      reader.onload = () => {
        const result = btoa(reader.result as string);
        resolve(result);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsBinaryString(file);
    });
    //Fin dek firmato para convertir..
  }

  //Metodo que me va permitir ingresar la informacion del cliente y tambien a proceder a crear la cuenta del mismo
  public savePersona() {
    console.log(this.persona);
    this.authUser.registerUser(this.persona).subscribe(
      (data: any) => {
        this.user.persona = data;

        //Implementacion request para la creacion de la cuenta del usuario:
        this.authUser.signUp(this.user).subscribe((data: any) => {
          console.log('Es lo que tenemoos ene la parte' + data);
        });
      },
      (err) => {}
    );
  }
  //Fin del metodo de la creacion de la persona y de su cuenta.

  //Esta varivale me va permitir usar para que los cambios de apartados no me permitan hacerlos por las validaciones..

  isButtonDisabled = true;
  enableViewBtnF = true;
  enableViewBtnT = false;

  //Validaciones para los campos
  uservalida = false;
  passvalida = false;

  public validaUserPass() {
    // let passwordR = (<HTMLInputElement>document.getElementById("usuario")).value;
    console.log('Lo que tenemos en la pass: ' + this.user.contrasenia);
    if (
      this.user.usuario === '' ||
      this.user.usuario === undefined ||
      this.user.usuario === null ||
      this.user.contrasenia === '' ||
      this.user.contrasenia === undefined ||
      this.user.contrasenia === null ||
      this.passwordR.passwordU === '' ||
      this.passwordR.passwordU === undefined ||
      this.passwordR.passwordU === null
    ) {
      this.uservalida = true;
      this.passvalida = true;
      alert('Verifique los campos vacios ');

      console.log('mal');

      this.enableViewBtnF = true;
      this.enableViewBtnT = false;

      this.isButtonDisabled = true;
    } else {
      //Validado que los campos estan vacios
      this.uservalida = false;
      this.passvalida = false;

      let passwordStrong = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})';
      let pattern = new RegExp(passwordStrong);
      if (pattern.test(this.user.contrasenia)) {
        if (this.user.contrasenia === this.passwordR.passwordU) {
          alert('bien btn habilitado con la contra');
          this.enableViewBtnF = false;
          this.enableViewBtnT = true;
          this.isButtonDisabled = false;
        } else {
          alert('Las contraseñas no coinciden');
        }
      } else {
        alert('La password no es fuerte');
      }
    }
  }

  //Método que me va impedir poner otra contraseña por parte del uuario..
  //Declaramos una bandera.
  passwordIgual: boolean = false;
  validarMismaPassword(evento: any) {
    let passwordValor = this.user.contrasenia;
    let passwordINgreso = evento.target.value;

    if (passwordValor === passwordINgreso) {
      this.passwordIgual = false;
    } else {
      this.passwordIgual = true;
    }
  }
  //Fin del Método que me va impedir poner otra contraseña por parte del uuario..

  // public selectedGender = '';
  //Validar para que ingrese el user y pass y cambien el contenido

  //FIN DE LA PRIMER PARTE INGRESO DE DATOS PARA LA CUENTA.-------------------------------------------------------------------

  //CONTROL DE LA SEGUNDA PARTE DE LOS REGISTRO CON LOS DATOS PERSONALES.-------------------------------------------------------------------

  //Implementación de la validacion de los datos personales del usuario..
  public validarDatosPersona() {

    console.log(this.persona);
    if (
      this.persona.cedula === '' ||
      this.persona.cedula === undefined ||
      this.persona.cedula === null ||
      this.persona.nombres === '' ||
      this.persona.nombres === undefined ||
      this.persona.nombres === null ||
      this.persona.genero === '' ||
      this.persona.genero === undefined ||
      this.persona.genero === null ||
      this.persona.direccion === '' ||
      this.persona.direccion === undefined ||
      this.persona.direccion === null ||
      this.persona.telefono === '' ||
      this.persona.telefono === undefined ||
      this.persona.telefono === null ||
      this.persona.celular === '' ||
      this.persona.celular === undefined ||
      this.persona.celular === null ||
      this.persona.correo === '' ||
      this.persona.correo === undefined ||
      this.persona.correo === null ||
      this.persona.edad === undefined ||
      this.persona.edad === null 
      // this.persona.foto === '' ||
      // this.persona.foto === undefined ||
      // this.persona.foto === null 
    ) {
      alert('Campos de person no estan llenos')
    }else{

      const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if(this.validateGoogleEmail(this.persona.correo)){
        alert('Correo bien')
      }else{
        alert('ECorreo mal')
      }
      

    }

  }
  //Fin de la Implementación de la validacion de los datos personales del usuario..

//Validar correo que sea de google
public validateGoogleEmail(email: string) {
  const pattern = /^[a-z0-9._%+-]+@(?:(?:[a-z0-9-]+\.)?[google]+\.[a-z]{2,3}|(?:[a-z0-9-]+\.)?(googlemail)\.com)$/;
  return pattern.test(email);
}

// const email = "example@google.com";
// console.log(validateGoogleEmail(email)); // true

//Fin del validar correo que sea por google..

//Validacion del email
public validateEmail(email: string) {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

// const email = "example@example.com";
// console.log(validateEmail(email)); // outputs: true

//Fin de la validacion del email..

  //Implementación de el evento el cual va a cojer el usuario para su genero
  filtersImplements(e: any) {
    let filters = e.target.value;
    if (filters === '' || filters === undefined || filters === null) {
      console.log('Genero no seleccionado');
    } else {
      this.persona.genero = filters;
      console.log(this.persona.genero);
    }
  }
  //Fin de la Implementación de el evento el cual va a cojer el usuario para su genero

  //FIN DEL CÓDIGO CONTROL DE LA SEGUNDA PARTE DE LOS REGISTRO CON LOS DATOS PERSONALES.-------------------------------------------------------------------

  //ESTE MÉTODO NOS VA SERVIR PARA TODO PARA QUE NO PUEDA INGRESAR CON ESPACIOS EN BLANCO
  //Método que me va impedir poner espacios en los imputs
  contatSpace(evento: any) {
    let espacioBlanco = evento.target.value;

    let sinEspacios = espacioBlanco.replace(/\s/g, '');
    evento.target.value = sinEspacios;
  }
  //Fin del Método que me va impedir poner espacios en los imputs

  confirm1() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }

  idp: number = 1;
}
