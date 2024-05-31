import { Component } from '@angular/core';
import { PartidoService } from '../../../services/partidos/partido.service';
import { Partido } from '../../../models/partido';

@Component({
  selector: 'app-agregar-partidos',
  templateUrl: './agregar-partidos.component.html',
  styleUrl: './agregar-partidos.component.css'
})
export class AgregarPartidosComponent {
  nuevoPartido = {
    Equipo1: '',
    Equipo2: '',
    Fecha: '',
    Estatus: '',
    Torneo: ''
  };
  partido : Partido  = {
    idPartido: 0,
    idEquipo1: 0,
    idEquipo2: 0,
    Equipo1: '',
    Equipo2: '',
    Fecha: '',
    estatus: '',
    Torneo: '',
    idTorneo: 0
  };
  mensajeError: string | null = null;
  mensajeExito: string | null = null;

  constructor(private partidoService: PartidoService) { }

  onSubmit(): void {
    this.partidoService.agregarPartido(this.partido).subscribe(
      response => {
        console.log('Partido agregado:', response);
        this.mensajeExito = 'Partido agregado correctamente.';
        this.mensajeError = null;
        this.resetForm();
      },
      error => {
        console.error('Error al agregar partido:', error);
        this.mensajeError = 'Error al agregar el partido. Por favor, inténtelo de nuevo más tarde.';
        this.mensajeExito = null;
      }
    );
  }

  resetForm(): void {
    this.nuevoPartido = {
      Equipo1: '',
      Equipo2: '',
      Fecha: '',
      Estatus: '',
      Torneo: ''
    };
  }
}
