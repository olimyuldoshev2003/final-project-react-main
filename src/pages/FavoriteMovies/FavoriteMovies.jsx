import React, { useEffect, useState } from "react";
import styles from "./FavoriteMovies.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteMovies, getMovies } from "../../api/api";
import { Link } from "react-router-dom";

//Material UI
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

const FavoriteMovies = () => {
  const dispatch = useDispatch();

    const favoriteMovies = useSelector((store)=>store.moviesState.favoriteMovies)

  async function removeFromFavorite(obj) {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/favoriteMovies/${obj.id}`
      );

      (dispatch(getFavoriteMovies()))
    } catch (error) {
      console.error(error);
    }
  }

    useEffect(() => {
      dispatch(getFavoriteMovies())
  }, []);
  return (
    <>
      <div className={`${styles.page_favorite_movies}`}>
        {favoriteMovies.length === 0 ? (
          <div className={styles.for_h1}>
            <h1>Trailers not found</h1>
          </div>
        ) : (
          <div className={styles.for_h1}>
            <h1>
              List of favorite trailers found {favoriteMovies.length} trailers
            </h1>
          </div>
        )}

        <section className={`${styles.section_2}`}>
          {favoriteMovies.map((item) => {
            return (
              <div key={item.id} className={`${styles.each_movie_favorite}`}>
                <Link to={`/eachMovies/${item.id}`}>
                  <video src={item.movie}></video>
                </Link>
                <h2>{item.name}</h2>
                <IconButton
                  onClick={() => {
                    removeFromFavorite(item);
                  }}
                >
                  <FavoriteIcon />
                  {/* <h2>Remove</h2> */}
                </IconButton>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default FavoriteMovies;
