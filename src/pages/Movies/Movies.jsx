import React, { useEffect, useState } from "react";
import styles from "./Movies.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getFavoriteMovies, getMovies, getSavedMovies } from "../../api/api";
import { Link } from "react-router-dom";

//Material Icon
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Drawer, IconButton, Pagination } from "@mui/material";
import { LibraryAdd } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import axios from "axios";

const Movies = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [pageQTU, setPageQTU] = useState(0);

  const favoriteMovies = useSelector(
    (store) => store.moviesState.favoriteMovies
  );
  const savedMovies = useSelector((store) => store.moviesState.savedMovies);
  const movies = useSelector((store) => store.moviesState.movies);
  const loading = useSelector((store) => store.moviesState.loading);

  // const isAlreadyFavorite = favoriteMovies.some((obj) => movies.map((item) => {
  //     return obj.id === item.id
  //   }));
  //   const isAlreadySaved = savedMovies.some((obj) =>
  //     movies.map((item) => {
  //       return obj.id === item.id;
  //     })
  //   );

  async function getMoviesQTU() {
    try {
      const { data } = await axios.get(`http://localhost:3000/movies`);
      setPageQTU(Math.ceil(data.length / +limit));
    } catch (error) {}
  }

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
        dispatch(getSavedMovies());
      } else {
        alert("Movie is already in the saved list");
      }
    } catch (error) {}
  }

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div className={`${styles.block_filter_mobile_size}`}>
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
        className={`${styles.drawer_mobile_size}`}
      >
        <div className={`${styles.filter_mobile_size}`}>
          <div className={`${styles.for_h1_mobile_size}`}>
            <h1>Filters</h1>
            <button
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              &times;
            </button>
          </div>
          {/* <div className={`${styles.for_filters}`}>
              <h1>Filters</h1>
              <div className={`${styles.for_filter}`}>

              </div>
            </div> */}
          <div className={`${styles.filters_block_mobile_size}`}>
            <div className={`${styles.by_genre}`}>
              <h1>Genre</h1>
              <ul className={`${styles.each_genres}`}>
                <li>
                  <Link to={`/movies/action`}>Action</Link>
                </li>
                <li>
                  <Link to={`/movies/comedy`}>Comedy</Link>
                </li>
                <li>
                  <Link to={`/movies/documentary`}>Documentary</Link>
                </li>
                <li>
                  <Link to={`/movies/drama`}>Drama</Link>
                </li>
                <li>
                  <Link to={`/movies/horror`}>Horror</Link>
                </li>
                <li>
                  <Link to={`/movies/thriller`}>Thriller</Link>
                </li>
                <li>
                  <Link to={`/movies/crime`}>Crime</Link>
                </li>
              </ul>
            </div>
            <div className={`${styles.by_year}`}>
              <h1>By Year</h1>
              <ul className={`${styles.each_movies_by_year}`}>
                <li>
                  <Link to={`/moviesByYear/2020`}>2020</Link>
                </li>
                <li>
                  <Link to={`/moviesByYear/2021`}>2021</Link>
                </li>
                <li>
                  <Link to={`/moviesByYear/2022`}>2022</Link>
                </li>
                <li>
                  <Link to={`/moviesByYear/2023`}>2023</Link>
                </li>
                <li>
                  <Link to={`/moviesByYear/2024`}>2024</Link>
                </li>
              </ul>
            </div>
          <div className={`${styles.by_viewers}`}></div>
          </div>
        </div>
      </Box>
    </div>
  );

  useEffect(() => {
    dispatch(getMovies({ page: page }));
    dispatch(getFavoriteMovies());
    dispatch(getSavedMovies());
    getMoviesQTU();
  }, [dispatch, page, limit]);

  return (
    <>
      <div className={styles.page_movies}>
        <section className={`${styles.section_1}`}>
          <div className={`${styles.main_block_section_1}`}>
            <h1>All movies</h1>
            <div className={`${styles.btn_filter_mobile_size}`}>
              {["bottom"].map((anchor) => (
                <React.Fragment key={anchor}>
                  <button onClick={toggleDrawer(anchor, true)}>Filters</button>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}
            </div>
            <div className={`${styles.all_movies}`}>
              {loading ? (
                <div>
                  <h1>...Loading</h1>
                </div>
              ) : (
                movies?.map((item) => {
                  return (
                    <div
                      className={`${styles.each_movies_movies}`}
                      key={item.id}
                    >
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
            <div className={`${styles.for_pagination}`}>
              <Pagination
                count={pageQTU}
                page={page}
                onChange={(e, newPage) => {
                  console.log(e);
                  setPage(newPage)
                }}
              />
            </div>
          </div>
          <div className={`${styles.filter_block_s_1}`}>
            <div className={`${styles.for_h1}`}>
              <h1>Filters</h1>
            </div>
            {/* <div className={`${styles.for_filters}`}>
              <h1>Filters</h1>
              <div className={`${styles.for_filter}`}>

              </div>
            </div> */}
            <div className={`${styles.by_genre}`}>
              <h1>Genre</h1>
              <ul className={`${styles.each_genres}`}>
                <li>
                  <Link to={`/movies/action`}>Action</Link>
                </li>
                <li>
                  <Link to={`/movies/comedy`}>Comedy</Link>
                </li>
                <li>
                  <Link to={`/movies/documentary`}>Documentary</Link>
                </li>
                <li>
                  <Link to={`/movies/drama`}>Drama</Link>
                </li>
                <li>
                  <Link to={`/movies/horror`}>Horror</Link>
                </li>
                <li>
                  <Link to={`/movies/thriller`}>Thriller</Link>
                </li>
                <li>
                  <Link to={`/movies/crime`}>Crime</Link>
                </li>
              </ul>
            </div>
            <div className={`${styles.by_year}`}>
              <h1>By Year</h1>
              <ul className={`${styles.each_movies_by_year}`}>
                <li>
                  <Link to={`/moviesByYear/2020`}>2020</Link>
                </li>
                <li>
                  <Link to={`/moviesByYear/2021`}>2021</Link>
                </li>
                <li>
                  <Link to={`/moviesByYear/2022`}>2022</Link>
                </li>
                <li>
                  <Link to={`/moviesByYear/2023`}>2023</Link>
                </li>
                <li>
                  <Link to={`/moviesByYear/2024`}>2024</Link>
                </li>
              </ul>
            </div>
            <div className={`${styles.by_viewers}`}></div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Movies;
