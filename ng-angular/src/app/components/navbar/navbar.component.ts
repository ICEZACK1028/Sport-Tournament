import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public identidad

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.identidad = localStorage.getItem('identidad')
    this.identidad = JSON.parse(this.identidad)
    console.log(this.identidad);
  }

  cerrarSesion(){
    localStorage.clear()
    // this._router.navigate(['/login'])
  }
}