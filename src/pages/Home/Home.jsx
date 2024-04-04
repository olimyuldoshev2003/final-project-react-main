import axios from "axios";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../api/api";

const Home = () => {
  const dispatch = useDispatch();

  const movies = useSelector((store) => store.moviesState.movies);
  const loading = useSelector((store) => store.moviesState.loading);

  useEffect(() => {
    dispatch(getMovies());
  }, []);

  return (
    <>
      <div className={styles.container}>
        {loading ? (
          <div>
            <h1>...Loading</h1>
          </div>
        ) : (
          movies.map((item) => {
            return (
              <div key={item.id}>
                <video src={item.movie} width={200} height={200}></video>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;
