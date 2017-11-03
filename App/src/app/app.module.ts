import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

//App Imports
import { AppComponent }         from './app.component';
import { MovieService }          from './movie.service';
import { MovieTableComponent }      from './movie-table.component';
import { MovieRowComponent }      from './movie-row.component';
import { MovieRowEditComponent }      from './movie-row-edit.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [
    AppComponent,
    MovieTableComponent,
    MovieRowComponent,
    MovieRowEditComponent
  ],
  providers: [ MovieService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
