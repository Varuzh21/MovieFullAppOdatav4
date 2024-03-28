using moviefullapp as my from '../db/src/schema';

service MyMovieEntity {    
   entity Movies as projection on my.Movies;
   entity Review as projection on my.Review;
   entity Genres as projection on my.Genres;
   entity Directors as projection on my.Directors
   entity Actors as projection on my.Actors;
   entity Country as projection on my.Country;
   entity Users as projection on my.Users;
}