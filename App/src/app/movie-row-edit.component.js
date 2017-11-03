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
// Keep the Input import for now, you'll remove it later:
var core_1 = require("@angular/core");
var movie_1 = require("./movie");
var movie_service_1 = require("./movie.service");
var movie_table_component_1 = require("./movie-table.component");
require("rxjs/add/operator/switchMap");
var MovieRowEditComponent = (function () {
    function MovieRowEditComponent(movieService) {
        this.movieService = movieService;
        this.movie = { id: 0, title: "", genre: "", actor: "" };
        this.add = false;
    }
    MovieRowEditComponent.prototype.ngOnInit = function () {
        this.defaultFocus.nativeElement.focus();
        this.oldMovie = JSON.parse(JSON.stringify(this.movie));
    };
    MovieRowEditComponent.prototype.reset = function () {
        this.movie.title = this.oldMovie.title;
        this.movie.genre = this.oldMovie.genre;
        this.movie.actor = this.oldMovie.actor;
        this.movie = JSON.parse(JSON.stringify(this.oldMovie));
    };
    MovieRowEditComponent.prototype.goBack = function () {
        // Reset to old values.
        this.defaultFocus.nativeElement.focus();
        this.table.movieEdit = null;
    };
    MovieRowEditComponent.prototype.save = function (movie) {
        var _this = this;
        if (this.add) {
            this.table.add(this.movie.title, this.movie.genre, this.movie.actor);
            this.goBack();
        }
        else {
            this.movie = JSON.parse(JSON.stringify(movie));
            this.movieService.update(this.movie)
                .then(function () { return _this.goBack(); });
        }
    };
    return MovieRowEditComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", movie_1.Movie)
], MovieRowEditComponent.prototype, "movie", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MovieRowEditComponent.prototype, "add", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", movie_table_component_1.MovieTableComponent)
], MovieRowEditComponent.prototype, "table", void 0);
__decorate([
    core_1.ViewChild('defaultFocus'),
    __metadata("design:type", Object)
], MovieRowEditComponent.prototype, "defaultFocus", void 0);
MovieRowEditComponent = __decorate([
    core_1.Component({
        selector: '[movie-row-edit]',
        templateUrl: './movie-row-edit.component.html',
    }),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieRowEditComponent);
exports.MovieRowEditComponent = MovieRowEditComponent;
//# sourceMappingURL=movie-row-edit.component.js.map