import React, { useEffect } from "react";
import styles from "./SavedMovies.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getSavedMovies } from "../../api/api";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import axios from "axios";

const SavedMovies = () => {
  const dispatch = useDispatch();

  const savedMovies = useSelector((store) => store.moviesState.savedMovies);

  async function removeFromSaved(obj) {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/savedMovies/${obj.id}`
      );

      dispatch(getSavedMovies());
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    dispatch(getSavedMovies());
  }, []);

  return (
    <>
      <div className={`${styles.page_saved_movies}`}>
        {savedMovies.length === 0 ? (
          <div className={styles.for_h1}>
            <h1>Trailers not found</h1>
          </div>
        ) : (
          <div className={styles.for_h1}>
            <h1>
              List of saved trailers found {savedMovies.length} trailers
            </h1>
          </div>
        )}

        <section className={`${styles.section_2}`}>
          {savedMovies.map((item) => {
            return (
              <div key={item.id} className={`${styles.each_movie_saved}`}>
                <Link to={`/eachMovies/${item.id}`}>
                  <video src={item.movie}></video>
                </Link>
                <h2>{item.name}</h2>
                <IconButton
                  onClick={() => {
                    removeFromSaved(item);
                  }}
                >
                  <BookmarkRemoveIcon />
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

export default SavedMovies;
