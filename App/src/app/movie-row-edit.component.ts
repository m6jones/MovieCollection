/**
 *  This component allows one to create a row in a table that allows you to edit or add a movie.
 */
// Keep the Input import for now, you'll remove it later:
import { Component, Input, OnInit, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { Movie } from './movie';
import { MovieService } from './movie.service';
import { MovieTableComponent } from './movie-table.component';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: '[movie-row-edit]',
  templateUrl: './movie-row-edit.component.html',
})
export class MovieRowEditComponent implements OnInit {
  @Input() movie: Movie = {id:0, title:"",genre:"",actor:""};
  @Input() add: boolean = false;
  @Input() table: MovieTableComponent;
  @ViewChild('defaultFocus') defaultFocus:ElementRef;
  oldMovie: Movie; // holds the orginal movie information so user can cancel changes.
  ngOnInit(): void {
    this.defaultFocus.nativeElement.focus();
    this.oldMovie = JSON.parse(JSON.stringify(this.movie));
  }
  constructor(
    private movieService: MovieService,
  ) {}
  
  // Resets values back to orginal.
  reset(): void {
    // required to set the values in the list back
    this.movie.title = this.oldMovie.title;
    this.movie.genre = this.oldMovie.genre;
    this.movie.actor = this.oldMovie.actor;
    // required for the actual change.
    this.movie = JSON.parse(JSON.stringify(this.oldMovie));
  }
  
  // Go back to the state where this row is not editing.
  goBack(): void {
    this.defaultFocus.nativeElement.focus();
    this.table.movieEdit = null;
  }
  
  // Save the changes made while using this form.
  save(movie: Movie): void {
    // If we are adding new entires process is slightly different.
    if(this.add) {
      this.table.add(this.movie.title, this.movie.genre, this.movie.actor); 
      this.goBack();
    } else {
      this.movie = JSON.parse(JSON.stringify(movie));
      this.movieService.update(this.movie)
        .then(() => this.goBack());
    }
  }
}