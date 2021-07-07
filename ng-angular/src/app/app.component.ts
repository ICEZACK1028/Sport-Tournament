import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-angular';

  constructor() { }

  usuarioLogueado(){
    if(JSON.parse(sessionStorage.getItem('identidad')) == null){
      return false
    }else{
      return true
    }
  }

}
