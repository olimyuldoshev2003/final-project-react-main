import axios from "axios";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteMovies, getMovies, getMoviesOfMovie, getSavedMovies } from "../../api/api";
import { Link } from "react-router-dom";

//Material Icon
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import { LibraryAdd } from "@mui/icons-material";

const Home = () => {
  const dispatch = useDispatch();
  const favoriteMovies = useSelector(
    (store) => store.moviesState.favoriteMovies
  );
  const savedMovies = useSelector((store) => store.moviesState.savedMovies);
  const movies = useSelector((store) => store.moviesState.moviesOfEachMovie);
  const loading = useSelector((store) => store.moviesState.loading);

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
        // If the movie is already in the list, you can handle it accordingly
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
    } catch (error) {}
  }

  useEffect(() => {
    dispatch(getMovies());
    dispatch(getFavoriteMovies())
    dispatch(getSavedMovies())
    dispatch(getMoviesOfMovie())
  }, [dispatch]);

  return (
    <>
      <div className={styles.home_page}>
        <section className={`${styles.section_1}`}>
          <h1>Now popular</h1>
          <div className={`${styles.some_movies}`}>
            {loading ? (
              <div>
                <h1>...Loading</h1>
              </div>
            ) : (
              movies
                .toSorted((a, b) => {
                  return b.viewers - a.viewers;
                })
                .slice(1, 5)
                .map((item) => {
                  return (
                    <div className={`${styles.each_movies_home}`} key={item.id}>
                      <Link to={`/eachMovies/${item.id}`}>
                        <video src={item.movie}></video>
                        <h2>{item.name}</h2>
                        <h5>{item.viewers} watching</h5>
                      </Link>
                      <div className={`${styles.for_btns}`}>
                        <div className={`${styles.for_favorite_video}`}>
                          {/* {!isAlreadyFavorite ? ( */}
                          <IconButton
                            onClick={() => {
                              addToFavorite(item);
                            }}
                          >
                            <FavoriteBorderIcon />
                            {/* <h2>Add</h2> */}
                          </IconButton>
                          {/* ) : ( */}
                          {/* <IconButton>
                            <FavoriteIcon />
                          </IconButton> */}
                          {/* )} */}
                          <h2>Favorite</h2>
                        </div>
                        <div className={`${styles.for_save}`}>
                          <IconButton
                            onClick={() => {
                              saveThisMovie(item);
                            }}
                          >
                            <LibraryAdd />
                            {/* <h2>Add</h2> */}
                          </IconButton>
                          {/* {!isAlreadySaved ? */}
                          <h2>Save</h2>
                          {/* : <h2>Saved</h2>} */}
                        </div>
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
