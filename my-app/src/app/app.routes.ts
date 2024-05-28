import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { TorneosComponent } from './torneos/torneos.component';

export const routes: Routes = [
    { path: 'paginaPrincipal', component: PrincipalComponent },
    { path: 'torneos', component: TorneosComponent }
];
