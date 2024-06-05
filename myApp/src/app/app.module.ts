// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EquiposComponent } from './components/equipos/equipos.component';
import { EditarEquipoComponent } from './components/equipos/editar-equipo/editar-equipo.component';
import { AgregarPartidosComponent } from './components/partidos/agregar-partidos/agregar-partidos.component';
import { CommonModule } from '@angular/common';
import { TorneosComponent } from './components/torneos/torneos.component';
import { EditarTorneoComponent } from './components/editar-torneo/editar-torneo.component';
import { AgregarTorneoComponent } from './components/agregar-torneo/agregar-torneo.component';
import { PartidosComponent } from './components/partidos/partidos.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { EditarPartidoComponent } from './components/partidos/editar-partido/editar-partido.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EquiposComponent,
    EditarEquipoComponent,
    AgregarPartidosComponent,
    TorneosComponent,
    EditarTorneoComponent,
    AgregarTorneoComponent,
    PartidosComponent,
    PaginaPrincipalComponent,
    EditarPartidoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    CommonModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-LA' },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }