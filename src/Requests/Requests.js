/* eslint-disable no-template-curly-in-string */
export const APIKEY = "83adfa01679754455f40398f15332c5f";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${APIKEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${APIKEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${APIKEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${APIKEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${APIKEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${APIKEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${APIKEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${APIKEY}&with_genres=99`,
  fetchAnimatedMovies: `/discover/movie?api_key=${APIKEY}&with_genres=16`,
  fetchSciFiMovies: `/discover/movie?api_key=${APIKEY}&with_genres=878`, 
  fetchFantasyMovies: `/discover/movie?api_key=${APIKEY}&with_genres=14`,
  fetchMysteryMovies: `/discover/movie?api_key=${APIKEY}&with_genres=9648`,
  fetchDramaMovies: `/discover/movie?api_key=${APIKEY}&with_genres=18`,
  fetchCrimeMovies: `/discover/movie?api_key=${APIKEY}&with_genres=80`,
  fetchThrillerMovies: `/discover/movie?api_key=${APIKEY}&with_genres=53`,
  fetchAdventureMovies: `/discover/movie?api_key=${APIKEY}&with_genres=12`,
  fetchWarMovies: `/discover/movie?api_key=${APIKEY}&with_genres=10752`,
  fetchHistoryMovies: `/discover/movie?api_key=${APIKEY}&with_genres=36`,
  fetchWesternMovies: `/discover/movie?api_key=${APIKEY}&with_genres=37`,
  fetchKidsMovies: `/discover/movie?api_key=${APIKEY}&with_genres=10751`,
  fetchMusicMovies: `/discover/movie?api_key=${APIKEY}&with_genres=10402`,
  fetchFamilyMovies: `/discover/movie?api_key=${APIKEY}&with_genres=10751`,
  fetchTVMovies: `/discover/movie?api_key=${APIKEY}&with_genres=10770`,
  fetchAnimeShows: `/discover/tv?api_key=${APIKEY}&with_genres=16&query=anime`,
  fetchRealityShows: `/discover/tv?api_key=${APIKEY}&with_genres=10764`,
  fetchGameShows: `/discover/tv?api_key=${APIKEY}&with_genres=10763`,
  fetchNewsShows: `/discover/tv?api_key=${APIKEY}&with_genres=10767`,
};

export default requests;