/**
 *  Builds a table row for a movie.
 */

// Keep the Input import for now, you'll remove it later:
import { Component, Input, OnInit, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { Movie } from './movie';
import { MovieService } from './movie.service';
import { MovieTableComponent } from './movie-table.component';

@Component({
  selector: '[movie-row]',
  templateUrl: './movie-row.component.html',
})
export class MovieRowComponent implements OnInit {
  @Input() movie: Movie;
  @Input() table: MovieTableComponent;
  fromFocus : boolean = false;
  @ViewChild('defaultFocus') defaultFocus:ElementRef;
  ngDoCheck(): void {
    if(this.table.selectedMovie === this.movie && !this.fromFocus) {
      this.defaultFocus.nativeElement.focus();
      this.fromFocus = false;
    }
  }
  ngOnInit(): void {
  }
  constructor(
    private movieService: MovieService,
  ) {}
  
}//# sourceMappingURL=movie-row.component.js.map