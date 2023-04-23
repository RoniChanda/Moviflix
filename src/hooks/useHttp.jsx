import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { movieActions } from "../redux/movieSlice";
import { tvActions } from "../redux/tvSlice";

export default function useHttp() {
  const dispatch = useDispatch();

  //# popular movies/tv shows
  const loadPopular = useCallback(
    async (
      type,
      page = 1,
      genre = "",
      rating = "",
      language = "",
      sort = "popularity.desc",
      startYear = "",
      endYear = ""
    ) => {
      try {
        if (type === "movie") {
          dispatch(movieActions.resetPopular());
        } else if (type === "tv") {
          dispatch(tvActions.resetPopular());
        }

        const response = await fetch(
          `${import.meta.env.VITE_TMDB_BASE_URL}/discover/${type}?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }&page=${page}&with_genres=${genre}&vote_average.gte=${rating}&with_original_language=${language}&sort_by=${sort}&${
            type === "movie" ? "primary_release_date.gte" : "air_date.gte"
          }=${startYear}&${
            type === "movie" ? "primary_release_date.lte" : "air_date.lte"
          }=${endYear}`
        );

        const resData = await response.json();
        if (type === "movie") {
          dispatch(movieActions.getPopular(resData));
        } else if (type === "tv") {
          dispatch(tvActions.getPopular(resData));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );

  //# top rated movies/tv shows
  const loadTopRated = useCallback(
    async (type) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_TMDB_BASE_URL}/${type}/top_rated?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }`
        );

        const resData = await response.json();
        if (type === "movie") {
          dispatch(movieActions.getTopRated(resData.results));
        } else if (type === "tv") {
          dispatch(tvActions.getTopRated(resData.results));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );

  //# upcoming movies/tv shows
  const loadUpcoming = useCallback(
    async (type) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_TMDB_BASE_URL}/${type}/${
            type === "movie" ? "upcoming" : "on_the_air"
          }?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );

        const resData = await response.json();
        if (type === "movie") {
          dispatch(movieActions.getUpcoming(resData.results));
        } else if (type === "tv") {
          dispatch(tvActions.getUpcoming(resData.results));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );

  //# Get details of movies or tv shows
  const loadDetails = useCallback(async (type, id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_TMDB_BASE_URL}/${type}/${id}?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      );

      const resData = await response.json();

      return resData;
    } catch (error) {
      console.error(error);
    }
  }, []);

  //# Get Trailer
  const loadTrailer = useCallback(async (type, id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_TMDB_BASE_URL}/${type}/${id}/videos?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      );

      const resData = await response.json();

      const trailer = resData.results.filter((item) => item.type === "Trailer");
      return trailer[0].key;
    } catch (error) {
      console.error(error);
    }
  }, []);

  //# Get Credits
  const loadCredits = useCallback(async (type, id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_TMDB_BASE_URL}/${type}/${id}/credits?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      );

      const resData = await response.json();
      return resData;
    } catch (error) {
      console.error(error);
    }
  }, []);

  //# Get Reviews
  const loadReviews = useCallback(async (type, id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_TMDB_BASE_URL}/${type}/${id}/reviews?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      );

      const resData = await response.json();
      return resData.results;
    } catch (error) {
      console.error(error);
    }
  }, []);

  //# Get person details
  const loadPerson = useCallback(async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_TMDB_BASE_URL}/person/${id}?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      );

      const resData = await response.json();
      return resData;
    } catch (error) {
      console.error(error);
    }
  }, []);

  //# Get movie genres
  const loadGenres = useCallback(
    async (type) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_TMDB_BASE_URL}/genre/${type}/list?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }`
        );

        const resData = await response.json();
        if (type === "movie") {
          dispatch(movieActions.getMovieGenres(resData.genres));
        } else if (type === "tv") {
          dispatch(tvActions.getTvGenres(resData.genres));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );

  //# search by a keyword
  const searchKeyword = useCallback(async (query, page) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_TMDB_BASE_URL}/search/multi?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&query=${query}&page=${page}`
      );

      const resData = await response.json();
      return resData;
    } catch (error) {
      console.error(error);
    }
  }, []);

  //# Movie download link
  const downloadLinks = useCallback(async (imdb_id) => {
    try {
      const response = await fetch(
        `https://yts.mx/api/v2/movie_details.json?imdb_id=${imdb_id}`
      );

      const resData = await response.json();
      return resData.data.movie.torrents;
    } catch (error) {
      console.error(error);
    }
  }, []);

  return {
    loadPopular,
    loadTopRated,
    loadUpcoming,
    loadDetails,
    loadTrailer,
    loadCredits,
    loadReviews,
    loadPerson,
    loadGenres,
    searchKeyword,
    downloadLinks,
  };
}
