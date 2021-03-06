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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
var MovieService = (function () {
    function MovieService(http) {
        this.http = http;
        this.moviesUrl = 'api/movies'; // URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    // Gets all movies once.
    MovieService.prototype.getMovies = function () {
        return this.http.get(this.moviesUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    MovieService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    // Gets a single movie once.
    MovieService.prototype.getMovie = function (id) {
        var url = this.moviesUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    // Get the data from the server using a filter.
    MovieService.prototype.search = function (term) {
        var searchTerms = new Array(0);
        if (term[0].title)
            searchTerms.push('title=' + term[0].title);
        if (term[0].genre)
            searchTerms.push('genre=' + term[0].genre);
        if (term[0].actor)
            searchTerms.push('actor=' + term[0].actor);
        var terms = searchTerms.join('&');
        return this.http
            .get("api/movies/?" + terms)
            .map(function (response) { return response.json().data; });
    };
    MovieService.prototype.update = function (movie) {
        var url = this.moviesUrl + "/" + movie.id;
        return this.http
            .put(url, JSON.stringify(movie), { headers: this.headers })
            .toPromise()
            .then(function () { return movie; })
            .catch(this.handleError);
    };
    MovieService.prototype.create = function (title, genre, actor) {
        return this.http
            .post(this.moviesUrl, JSON.stringify({ title: title, genre: genre, actor: actor }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    MovieService.prototype.delete = function (id) {
        var url = this.moviesUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    return MovieService;
}());
MovieService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MovieService);
exports.MovieService = MovieService;
//# sourceMappingURL=movie.service.js.map