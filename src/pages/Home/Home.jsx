import axios from "axios";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../api/api";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();

  const movies = useSelector((store) => store.moviesState.movies);
  const loading = useSelector((store) => store.moviesState.loading);

  useEffect(() => {
    dispatch(getMovies());
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
                    <Link to={`/eachMovies/${item.name}`}>
                      <div
                        key={item.id}
                        className={`${styles.each_movies_home}`}
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

export default Home;
