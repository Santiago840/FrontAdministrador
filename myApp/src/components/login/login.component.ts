import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { LoginService } from '../../services/login.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public myForm!: FormGroup;
  usuario: Usuario = {
    idAdministrador: 0,
    nombre: '',
    contrasena: ''
  };

  mensajeError: string | null = null;

  constructor(private loginService: LoginService) { }

  onSubmit(): void {
    this.loginService.loginUsuario(this.usuario).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        // Aquí puedes manejar la respuesta del servidor, como redirigir a otra página, guardar tokens de autenticación, etc.
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
      }
    );
  }
}
