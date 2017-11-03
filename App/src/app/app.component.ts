import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: `<h1>{{title}}</h1><movie-table></movie-table>`,
  //templateUrl: './app.component.html',
})
export class AppComponent  { 
    title = 'My Movie Collection';
}
