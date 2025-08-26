import styles from "./Movie.module.css";
import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getFavoriteMovies,
  getMovies,
  getMoviesOfMovie,
  getSavedMovies,
} from "../../api/api";
import { setMoviesOfEachMovie } from "../../reducers/moviesState/moviesState";

// Material Icon
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { LibraryAdd } from "@mui/icons-material";

const Movie = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const favoriteMovies = useSelector(
    (store) => store.moviesState.favoriteMovies
  );
  const savedMovies = useSelector((store) => store.moviesState.savedMovies);
  const movies = useSelector((store) => store.moviesState.moviesOfEachMovie);

  const [movie, setMovie] = useState([]);
  const [shuffledMovies, setShuffledMovies] = useState([]);

  const isAlreadyFavorite = favoriteMovies.some((obj) => obj.id === movie.id);
  const isAlreadySaved = savedMovies.some((obj) => obj.id === movie.id);

  // Function to shuffle array and return 5 random movies excluding the current one
  const getRandomMovies = useMemo(() => {
    return (moviesArray, currentId) => {
      if (!moviesArray || moviesArray.length === 0) return [];

      // Filter out the current movie
      const filteredMovies = moviesArray.filter(
        (movie) => movie.id !== currentId
      );

      // If we have 5 or fewer movies, return them all
      if (filteredMovies.length <= 5) return filteredMovies;

      // Shuffle the array using Fisher-Yates algorithm
      const shuffled = [...filteredMovies];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      // Return first 5 elements
      return shuffled.slice(0, 5);
    };
  }, []);

  async function getMovieById() {
    try {
      const { data } = await axios.get(`http://localhost:3000/movies/${id}`);
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  }

  async function addToFavorite(obj) {
    try {
      const isAlreadyFavorite = favoriteMovies.some(
        (movie) => movie.id === obj.id
      );
      if (!isAlreadyFavorite) {
        const { data } = await axios.post(
          `http://localhost:3000/favoriteMovies`,
          obj
        );
        dispatch(getFavoriteMovies());
      } else {
        alert("Movie is already in the favorite list");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function saveThisMovie(obj) {
    try {
      const isAlreadySaved = savedMovies.some((movie) => movie.id === obj.id);

      if (!isAlreadySaved) {
        const { data } = await axios.post(
          `http://localhost:3000/savedMovies`,
          obj
        );
        console.log(data);
        dispatch(getSavedMovies());
      } else {
        alert("Movie is already in the saved list");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    dispatch(getMovies());
    getMovieById();
    dispatch(getFavoriteMovies());
    dispatch(getSavedMovies());
    dispatch(getMoviesOfMovie());
  }, [id]);

  // Update shuffled movies when movies data or id changes
  useEffect(() => {
    if (movies && movies.length > 0) {
      const randomMovies = getRandomMovies(movies, id);
      setShuffledMovies(randomMovies);
    }
  }, [movies, id, getRandomMovies]);

  return (
    <>
      <div className={`${styles.page_each_movie}`}>
        <div className={`${styles.for_main_h1}`}>
          <h1>Watch this trailer</h1>
        </div>
        <section className={`${styles.section_1}`}>
          <div className={`${styles.first_block_s_1}`}>
            <div className={`${styles.for_video_and_btn}`}>
              <video src={movie.movie} controls></video>
            </div>
            <div className={`${styles.for_info_of_this_movie}`}>
              <h1>{movie.name}</h1>
              <div className={`${styles.for_description_and_viewers}`}>
                <p>{movie.description}</p>
              </div>
            </div>
            <div className={`${styles.for_btns}`}>
              <div className={`${styles.for_favorite_video}`}>
                {!isAlreadyFavorite ? (
                  <IconButton
                    onClick={() => {
                      addToFavorite(movie);
                    }}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                ) : (
                  <IconButton>
                    <FavoriteIcon />
                  </IconButton>
                )}
                <h2>Favorite</h2>
              </div>
              <div className={`${styles.for_save}`}>
                <IconButton
                  onClick={() => {
                    saveThisMovie(movie);
                  }}
                >
                  <LibraryAdd />
                </IconButton>
                {!isAlreadySaved ? <h2>Save</h2> : <h2>Saved</h2>}
              </div>
            </div>
          </div>
          <div className={`${styles.second_block_s_1}`}>
            <div className={`${styles.for_h1}`}>
              <h1>Top Trailers</h1>
            </div>
            <div className={`${styles.block_movies}`}>
              {shuffledMovies.map((item) => {
                return (
                  <Link to={`/eachMovies/${item.id}`} key={item.id}>
                    <div className={`${styles.each_movies}`}>
                      <video src={`${item.movie}`}></video>
                      <div className={`${styles.for_texts}`}>
                        <h1>{item.name}</h1>
                        <h4>
                          Genre: <span>{item.genre}</span>
                        </h4>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Movie;
