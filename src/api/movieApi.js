import axios from "axios";

const movieApi = {};

const BASEURL = "https://api.themoviedb.org";

movieApi.trending = () => {
  return axios.get(`${BASEURL}/3/trending/movie/day?language=en-US`, {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZWY4ZmU0MzZhN2E4YzVjMTYyMWFhMmM0NjQ2N2QzMSIsIm5iZiI6MTc0OTEzNDQ0Ny42NjgsInN1YiI6IjY4NDFhYzZmYWFmMGQ3MWRhNjI4YTJlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2dVoIsgG3yq3VasAMCAvj6UMuJG4mXuZlC4w1j7Jw_c",
    },
  });
};

movieApi.addFav = (movieId) => {
  return axios.post(`${BASEURL}/3/account/22057947/favorite`, movieId, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZWY4ZmU0MzZhN2E4YzVjMTYyMWFhMmM0NjQ2N2QzMSIsIm5iZiI6MTc0OTEzNDQ0Ny42NjgsInN1YiI6IjY4NDFhYzZmYWFmMGQ3MWRhNjI4YTJlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2dVoIsgG3yq3VasAMCAvj6UMuJG4mXuZlC4w1j7Jw_c",
    },
  });
};

export default movieApi;
