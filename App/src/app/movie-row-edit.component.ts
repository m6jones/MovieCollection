// Keep the Input import for now, you'll remove it later:
import { Component, Input, OnInit, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { Movie } from './movie';
import { MovieService } from './movie.service';
import { MovieTableComponent } from './movie-table.component';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: '[movie-row-edit]',
  templateUrl: './movie-row-edit.component.html',
  //styleUrls: [ './movie-row-edit.component.css' ]
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
  
  reset(): void {
    this.movie.title = this.oldMovie.title;
    this.movie.genre = this.oldMovie.genre;
    this.movie.actor = this.oldMovie.actor;
    this.movie = JSON.parse(JSON.stringify(this.oldMovie));
  }
  
  goBack(): void {
    // Reset to old values.
    
    this.defaultFocus.nativeElement.focus();
    this.table.movieEdit = null;
  }
  
  save(movie: Movie): void {
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