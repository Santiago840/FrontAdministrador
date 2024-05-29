import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myApp';

  constructor(private router: Router){}

  irEquipos(){
    this.router.navigate(['/equipos'])
  }

  irLogin(){
    this.router.navigate(['/login']);
  }
}
