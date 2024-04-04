import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Movie = () => {
  const { id } = useParams();

  async function getMoviesById() {
    try {
      const { data } = await axios.get(`http://localhost:3000/movies?q=${id}`);
      console.log(data);
    } catch (error) {}
  }

  useEffect(() => {
    getMoviesById();
  }, []);

  return <></>;
};

export default Movie;
