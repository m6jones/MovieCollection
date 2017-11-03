import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const movies = [
      { id: 0,  title: 'Alien',                genre: 'Horror',     actor: 'Sigourney Weaver'},
      { id: 1,  title: 'Aliens',                genre: 'Action',     actor: 'Sigourney Weaver'},
      { id: 2,  title: 'Alien 3',               genre: 'Horror',     actor: 'Sigourney Weaver'},
      { id: 3,  title: 'Alien: Resurrection',   genre: 'Horror',     actor: 'Sigourney Weaver'},
      { id: 4,  title: 'AVP',                  genre: 'Action',     actor: 'Sanaa Lathan'},
      { id: 5,  title: 'AVP: Requiem',         genre: 'Horror',     actor: 'Steven Pasquale'},
      { id: 6,  title: 'Predator',              genre: 'Action',     actor: 'Arnold Schwartzeneggar'},
      { id: 7,  title: 'Predator 2',            genre: 'Action',     actor: 'Danny Glover'},
      { id: 8,  title: 'Predators',             genre: 'Actions',    actor: 'Adrian Brody'},
      { id: 9,  title: 'Prometheus',            genre: 'Adventure',  actor: 'Noomi Rapace'},
      { id: 10, title: 'Alien Covenant',        genre: 'Horror',     actor: 'Michael Fassbender'}
    ];
    
    /*
    const actors {
      { id: 0, name: 'Sigourney Weaver',        movies: [0,1,2,3]},
      { id: 1, name: 'Sanaa Lathan'             movies: [4]},
      { id: 2, name: 'Steven Pasquale'          movies: [5]},
      { id: 3, name: 'Arnold Schwartzeneggar'   movies: [6]},
      { id: 4, name: 'Danny Glover'             movies: [7]},
      { id: 5, name: 'Adrian Brody'             movies: [8]},
      { id: 6, name: 'Noomi Rapace'             movies: [9]},
      { id: 7, name: 'Michael Fassbender'       movies: [10]}
    }
    */
    return {movies};
  }
}