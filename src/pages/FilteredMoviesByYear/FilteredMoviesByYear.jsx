import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./FilteredMoviesByYear.module.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FilteredMoviesByYear = () => {
  const { id } = useParams();

  const [moviesByYear, setMoviesByYear] = useState([]);

  async function getMoviesById() {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/movies?year=${id.toString()}`
      );
      setMoviesByYear(data);
      console.log(data);
    } catch (error) {}
  }

  useEffect(() => {
    getMoviesById();
  }, [id]);

  return (
    <>
      <div className={`${styles.page_filtered_movie_by_year}`}>
        <h1>
          List of {id} year, found {moviesByYear.length} trailers
        </h1>
        <div className={`${styles.got_filtered_movies_by_year}`}>
          {moviesByYear.map((item) => {
            return (
              <Link to={`/eachMovies/${item.id}`} key={item.id}>
                <div className={`${styles.each_movie_by_year}`} key={item.id}>
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

export default FilteredMoviesByYear;
