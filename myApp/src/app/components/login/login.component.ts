import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { LoginService } from '../../services/login.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';
import { ErrorModalComponent } from '../../modals/error-modal/error-modal.component';


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

  constructor(
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  openConfirmationModal(message: string): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '600px',
      height: '150px',
      data: { message: message }
    });
  }

  openErrorModal(message: string): void {
    const dialogRef = this.dialog.open(ErrorModalComponent, {
      width: '600px',
      height: '150px',
      data: { message: message }
    });
  }

  onSubmit(): void {
    this.mensajeError = null;  
  
    this.loginService.loginUsuario(this.usuario).subscribe(
      response => {
        if (response.message === 'Bienvenido') {
          this.openConfirmationModal(`Bienvenido ${this.usuario.nombre}`);
          this.router.navigate(['/pagina-principal']);
        } else {
          this.openErrorModal('Error en el nombre y/o contraseña');
        }
      }
    );
  }
}
