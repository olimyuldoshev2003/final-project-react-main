import React, { useEffect } from "react";
import styles from "./Movies.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getMovies } from "../../api/api";
import { Link } from "react-router-dom";

const Movies = () => {
  const dispatch = useDispatch();

  const movies = useSelector((store) => store.moviesState.movies);
  const loading = useSelector((store) => store.moviesState.loading);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <>
      <div className={styles.page_movies}>
        <section className={`${styles.section_1}`}>
          <h1>All movies</h1>
          <div className={`${styles.all_movies}`}>
            {loading ? (
              <div>
                <h1>...Loading</h1>
              </div>
            ) : (
              movies.map((item) => {
                return (
                  <Link to={`/eachMovies/${item.name}`}>
                    <div
                      key={item.id}
                      className={`${styles.each_movies_movies}`}
                    >
                      <video src={item.movie}></video>
                      <h2>{item.name}</h2>
                      <h5>{item.viewers} watching</h5>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Movies;
