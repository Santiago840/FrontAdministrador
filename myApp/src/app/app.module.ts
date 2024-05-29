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
import { MatNativeDateModule, MAT_DATE_LOCALE  } from '@angular/material/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EquiposComponent } from './components/equipos/equipos.component';
import { EditarEquipoComponent } from './components/equipos/editar-equipo/editar-equipo.component';
import { AgregarPartidosComponent } from './components/partidos/agregar-partidos/agregar-partidos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EquiposComponent,
    EditarEquipoComponent,
    AgregarPartidosComponent,
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

  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-LA' },
    provideAnimationsAsync(), 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}