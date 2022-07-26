export interface PartialMovieResult {
    title: string;
    year: string;
    imdbID: string;
    type: string;
    poster: string;
}

export interface SearchMovieResult {
    search: PartialMovieResult[];
    totalResults: string;
    response: string;
}

export interface MovieResult {
    title: string;
    year: string;
    rated: string;
    released: string;
    runtime: string;
    genre: string;
    director: string;
    writer: string;
    actors: string;
    plot: string;
    language: string;
    country: string;
    awards: string;
    poster: string;
    ratings: any[];
    metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    type: string;
    dvd: string;
    boxOffice: string;
    production: string;
    website: string;
    response: string;
}
