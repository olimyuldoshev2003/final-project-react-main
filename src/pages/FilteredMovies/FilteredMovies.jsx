import axios from "axios";
import styles from "./FilteredMovies.module.css";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const FilteredMovies = () => {
  const { id } = useParams();

  const [moviesByGenre, setMoviesByGenre] = useState([]);

  async function getMoviesById() {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/movies?q=${id}`
      );
      setMoviesByGenre(data);
      console.log(data);
    } catch (error) {}
  }

  useEffect(() => {
    getMoviesById();
  }, [id]);

  return (
    <>
      <div className={`${styles.page_filtered_movie}`}>
        <h1>
          List of {id} trailers, found {moviesByGenre.length} trailers
        </h1>
        <div className={`${styles.got_filtered_movies_by_genre}`}>
          {moviesByGenre.map((item) => {
            return (
              <Link to={`/eachMovies/${item.id}`} key={item.id}>
                <div className={`${styles.each_movie_by_genre}`}>
                  <video src={item.movie}></video>
                  <h2>{item.name}</h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FilteredMovies;
