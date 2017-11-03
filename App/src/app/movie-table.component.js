"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
// Observable class extensions
require("rxjs/add/observable/of");
// Observable operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/observable/fromPromise");
var movie_service_1 = require("./movie.service");
var MovieTableComponent = (function () {
    function MovieTableComponent(movieService) {
        this.movieService = movieService;
        this.movieEdit = null;
        this.searchTerms = new Subject_1.Subject();
        this.lastSearchTerm = { id: 0, title: "", genre: "", actor: "" };
    }
    // Manage which movie has been selected on the screen.
    MovieTableComponent.prototype.onSelect = function (movie) {
        if (this.movieEdit === null) {
            this.selectedMovie = movie;
        }
    };
    // Search for a movie
    MovieTableComponent.prototype.search = function (term) {
        this.searchTerms.next([term]);
        this.lastSearchTerm = term;
    };
    // Reload the movie list.
    MovieTableComponent.prototype.reload = function () {
        this.searchTerms.next([this.lastSearchTerm]);
    };
    // Set up the observable movie list that can be searched.
    MovieTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.movies = this.searchTerms
            .debounceTime(300) // wait 300ms after each keystroke before considering the term
            .switchMap(function (term) { return term
            ? _this.movieService.search(term)
            : Observable_1.Observable.fromPromise(_this.getMovies()); })
            .catch(function (error) {
            console.log(error);
            return Observable_1.Observable.of([]);
        });
    };
    // Load movies after being initiated.
    MovieTableComponent.prototype.ngAfterViewInit = function () {
        this.reload();
    };
    // Get all movies as a promise.
    MovieTableComponent.prototype.getMovies = function () {
        return this.movieService.getMovies();
    };
    // Add a new movie to the collection.
    MovieTableComponent.prototype.add = function (title, genre, actor) {
        var _this = this;
        //Trim all the white space.
        title = title.trim();
        genre = genre.trim();
        actor = actor.trim();
        if (!title || !genre || !actor) {
            return;
        }
        // send to api
        this.movieService.create(title, genre, actor)
            .then(function (movie) {
            _this.selectedMovie = null;
        });
        // Reload the list after the movie has been added.
        this.reload();
    };
    // Delete a movie from the collection
    MovieTableComponent.prototype.delete = function (movie) {
        var _this = this;
        // Send delete to the api.
        this.movieService
            .delete(movie.id)
            .then(function () {
            if (_this.selectedMovie === movie) {
                _this.selectedMovie = null;
            }
        });
        // Reload list after the deletion has taken place.
        this.reload();
    };
    return MovieTableComponent;
}());
MovieTableComponent = __decorate([
    core_1.Component({
        selector: 'movie-table',
        providers: [movie_service_1.MovieService],
        templateUrl: './movie-table.component.html',
    }),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieTableComponent);
exports.MovieTableComponent = MovieTableComponent;
//# sourceMappingURL=movie-table.component.js.map