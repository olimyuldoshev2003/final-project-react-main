import React from "react";
import { useParams } from "react-router-dom";

const Movie = () => {

  const { id } = useParams()
  console.log(id);


  return (
    <>
      <div className="page_each_movie"></div>
    </>
  );
};

export default Movie;
