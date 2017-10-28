var app = angular.module('MovieCollectionApp', []);
app.controller('movieListController', function() {
    var movieList = this;
    
    movieList.movies = [
      {title:'Alien', year:"1982", genre:"Horror"},
      {title:'Aliens', year:"1986", genre:"Action"},
      {title:'Alien 3', year:"1992", genre:"Action"},
      {title:'Alien Resurrection', year:"1997", genre:"Action"},
    ];
    
    movieList.selected = movieList.movies.length;
    
    movieList.add = function() {
      movieList.movies.push({title:movieList.title, year:movieList.year, genre:movieList.genre});
      movieList.title = '';
      movieList.year = '';
      movieList.genre = '';
      movieList.selected = movieList.movies.length;
    };
    
    movieList.del = function(index) {
      movieList.movies.splice(index,1);
    };
    movieList.select = function(index) {
      movieList.selected = index;
    };
    movieList.next = function() {
      if(movieList.movies.length != movieList.selected) {
        movieList.selected++;
      }
    };
    movieList.prev = function() {
      if(0 != movieList.selected) {
        movieList.selected--;
      }
    };
    movieList.length = function() {
      return movieList.movies.length;
    };
    movieList.isSelected = function(index) {
      return movieList.selected == index;
    };
    
    movieList.key = function($event){
        if($event.keyCode == 46)
          movieList.del(movieList.selected);
        else if($event.keyCode == 40)
          movieList.next();
        else if($event.keyCode == 38)
          movieList.prev();
    };
});

app.directive('focusMe', function($timeout) {
      return {
        scope: { trigger: '=focusMe' },
        link: function(scope, element) {
          scope.$watch('trigger', function(value) {
            if(value == true) {
                element[0].focus();
            }
          });
        }
      };
    });
    
app.directive('accessibleForm', function () {
    return {
        restrict: 'A',
        link: function (scope, elem) {
            // set up event handler on the form element
            elem.on('submit', function () {
              console.log(elem);
                // find the first invalid element
                var firstInvalid = elem[0].querySelector('.ng-invalid');

                // if we find one, set focus
                if (firstInvalid) {
                    firstInvalid.focus();
                } else {
                  elem[0][0].focus();
                }
            });
        }
    };
});