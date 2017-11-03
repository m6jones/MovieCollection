import { Component, OnInit, AfterContentInit,AfterViewInit } from '@angular/core';
import { Movie } from './movie';
import { MovieService } from './movie.service';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
 
// Observable class extensions
import 'rxjs/add/observable/of';
 
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromPromise';

@Component({
  selector: 'movie-table',
  providers: [MovieService],
  templateUrl: './movie-table.component.html',
})
export class MovieTableComponent implements OnInit {
  movies: Observable<Movie[]>;
  private searchTerms = new Subject<Movie[]>();
  private lastSearchTerm : Movie = {title:"",genre:"",actor:""};
  public selectedMovie: Movie;
  public movieEdit : Movie = null;
  constructor(
    private movieService: MovieService) { }
  
  onSelect(movie: Movie): void {
    if(this.movieEdit === null) {
      this.selectedMovie = movie;
    }
  }
  search(term: Movie): void {
    this.searchTerms.next(term);
    this.lastSearchTerm = term;
  }
  reload(): void {
    this.searchTerms.next(this.lastSearchTerm);
  }
  ngOnInit(): void {
    this.movies = this.searchTerms
        .debounceTime(300)        // wait 300ms after each keystroke before considering the term
        //.distinctUntilChanged()   // ignore if next search term is same as previous
        .switchMap(term => term && (term.title || term.genre || term.actor)  
          ? this.movieService.search(term)
          : Observable.fromPromise(this.getMovies()))
        .catch(error => {
          console.log(error);
          return Observable.of<Movie[]>([]);
        });
  }
  ngAfterViewInit() : void {
    this.searchTerms.next(this.lastSearchTerm);
  }
  getMovies(): Promise<Movie[]> {
    return this.movieService.getMovies();
  }
  
  add(title: string, genre: string, actor: string): void {
    title = title.trim();
    genre = genre.trim();
    actor = actor.trim();
    if (!title) { return; }
    if (!genre) { return; }
    if (!actor) { return; }
    this.movieService.create(title,genre,actor)
      .then(movie => {
        this.selectedMovie = null;
    });
    this.searchTerms.next(this.lastSearchTerm);
  }
  delete(movie: Movie): void {
    this.movieService
        .delete(movie.id)
        .then(() => {
          if (this.selectedMovie === movie) { this.selectedMovie = null; }
    });
    this.searchTerms.next(this.lastSearchTerm);
  }
}
