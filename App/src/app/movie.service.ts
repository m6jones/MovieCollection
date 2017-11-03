import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Movie } from './movie';
import { Actor } from './actor';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class MovieService {
  private moviesUrl = 'api/movies';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  
  constructor(private http: Http) { }
   
  getMovies(): Promise<Movie[]> {
    return this.http.get(this.moviesUrl)
               .toPromise()
               .then(response => response.json().data as Movie[])
               .catch(this.handleError);
  }
   
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
  
  getMovie(id: number): Promise<Movie> {
    const url = `${this.moviesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Movie)
      .catch(this.handleError);
  }
  
  search(term: Movie[]): Observable<Movie[]> {
    let searchTerms: string[] = new Array(0);
    
    if(term[0].title) searchTerms.push('title='+term[0].title);
    if(term[0].genre) searchTerms.push('genre='+term[0].genre);
    if(term[0].actor) searchTerms.push('actor='+term[0].actor);
    let terms : string = searchTerms.join('&');
    return this.http
               .get(`api/movies/?${terms}`)
               .map(response => response.json().data as Movie[]);
  }

  update(movie: Movie): Promise<Movie> {
    const url = `${this.moviesUrl}/${movie.id}`;
    return this.http
      .put(url, JSON.stringify(movie), {headers: this.headers})
      .toPromise()
      .then(() => movie)
      .catch(this.handleError);
  }
  
  create(title: string, genre: string, actor: string): Promise<Movie> {
    return this.http
      .post(this.moviesUrl, JSON.stringify({title: title, genre: genre, actor: actor}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Movie)
      .catch(this.handleError);
  }
  
  delete(id: number): Promise<void> {
    const url = `${this.moviesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}