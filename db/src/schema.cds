namespace moviefullapp;

using {cuid} from '@sap/cds/common';


entity Movies : cuid {
    Title       : String;
    Description : String;
    Images      : String;
    ReleaseDate : String;
    Rating      : Integer;
    director    : Association to Directors;
    genre       : Association to Genres;
    language    : Association to Language;
    review      : Association to many Review
                      on review.movie = $self;
}

entity Review : cuid {
    Rating     : Integer;
    ReviewText : String;
    ReviewDate : DateTime;
    movie      : Association to Movies;
    user       : Association to Users ;
}

entity Genres : cuid {
    GenreName : String;
    movie     : Association to many Movies
                    on movie.genre = $self;
}

entity Directors : cuid {
    FirstName : String;
    LastNeme  : String;
    actor     : Association to Actors ;
    movie     : Association to many Movies
                    on movie.director = $self;
}

entity Actors : cuid {
    FirstName : String;
    LastNeme  : String;
    directors : Association to many Directors
                    on directors.actor = $self;
}

entity Language : cuid {
    country : Association to Country;
    movie   : Association to many Movies
                  on movie.language = $self;
}

entity Country : cuid {
    Continent : String;
    language  : Association to many Language
                    on language.country = $self
}

entity Users : cuid {
    UserName : String;
    Password : String;
    review   : Association to many Review
                   on review.user = $self;
}