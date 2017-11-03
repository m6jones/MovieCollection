/**
 *  Builds a table row for a movie.
 */
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
var MovieRowComponent = (function () {
    function MovieRowComponent(movieService) {
        this.movieService = movieService;
        this.fromFocus = false;
    }
    MovieRowComponent.prototype.ngDoCheck = function () {
        if (this.table.selectedMovie === this.movie && !this.fromFocus) {
            this.defaultFocus.nativeElement.focus();
            this.fromFocus = false;
        }
    };
    MovieRowComponent.prototype.ngOnInit = function () {
    };
    return MovieRowComponent;
}()); //# sourceMappingURL=movie-row.component.js.map
__decorate([
    core_1.Input(),
    __metadata("design:type", movie_1.Movie)
], MovieRowComponent.prototype, "movie", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", movie_table_component_1.MovieTableComponent)
], MovieRowComponent.prototype, "table", void 0);
__decorate([
    core_1.ViewChild('defaultFocus'),
    __metadata("design:type", core_1.ElementRef)
], MovieRowComponent.prototype, "defaultFocus", void 0);
MovieRowComponent = __decorate([
    core_1.Component({
        selector: '[movie-row]',
        templateUrl: './movie-row.component.html',
    }),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieRowComponent);
exports.MovieRowComponent = MovieRowComponent;
//# sourceMappingURL=movie-row.component.js.map