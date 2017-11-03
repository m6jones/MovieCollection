import { Component, OnInit, AfterContentInit,AfterViewInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
 
// Observable class extensions
import 'rxjs/add/observable/of';
 
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromPromise';

// App Components
import { Movie } from './movie';
import { MovieService } from './movie.service';

@Component({
  selector: 'movie-table',
  providers: [MovieService],
  templateUrl: './movie-table.component.html',
})
export class MovieTableComponent implements OnInit {
  public movies: Observable<Movie[]>;
  public selectedMovie: Movie;
  public movieEdit : Movie = null;
  private searchTerms = new Subject<Movie[]>();
  private lastSearchTerm : Movie = {id:0,title:"",genre:"",actor:""};
  
  constructor(private movieService: MovieService) { }
  
  // Manage which movie has been selected on the screen.
  onSelect(movie: Movie): void {
    if(this.movieEdit === null) {
      this.selectedMovie = movie;
    }
  }
  
  // Search for a movie
  search(term: Movie): void {
    this.searchTerms.next([term]);
    this.lastSearchTerm = term;
  }
  
  // Reload the movie list.
  reload(): void {
    this.searchTerms.next([this.lastSearchTerm]);
  }
  
  // Set up the observable movie list that can be searched.
  ngOnInit(): void {
    this.movies = this.searchTerms
        .debounceTime(300) // wait 300ms after each keystroke before considering the term
        .switchMap(term => term
          ? this.movieService.search(term)
          : Observable.fromPromise(this.getMovies()))
        .catch(error => {
          console.log(error);
          return Observable.of<Movie[]>([]);
        });
  }
  // Load movies after being initiated.
  ngAfterViewInit() : void {
    this.reload();
  }
  
  // Get all movies as a promise.
  getMovies(): Promise<Movie[]> {
    return this.movieService.getMovies();
  }
  
  // Add a new movie to the collection.
  add(title: string, genre: string, actor: string): void {
    //Trim all the white space.
    title = title.trim();
    genre = genre.trim();
    actor = actor.trim();
    if (!title || !genre || !actor) { return; }
    
    // send to api
    this.movieService.create(title,genre,actor)
      .then(movie => {
        this.selectedMovie = null;
    });
    
    // Reload the list after the movie has been added.
    this.reload();
  }
  
  // Delete a movie from the collection
  delete(movie: Movie): void {
    // Send delete to the api.
    this.movieService
        .delete(movie.id)
        .then(() => {
          if (this.selectedMovie === movie) { this.selectedMovie = null; }
    });
    
    // Reload list after the deletion has taken place.
    this.reload();
  }
}
