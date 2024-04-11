import React, { useEffect, useRef, useState } from "react";
import styles from "./Layout.module.css";
import { Link, Outlet, useLocation } from "react-router-dom";

//for React icons
import { TfiSearch } from "react-icons/tfi";

//for images
import logoHeader from "../assets/logoHeader.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setSearchMovies } from "../reducers/moviesState/moviesState";
import { getSearchedMovies } from "../api/api";

const Layout = () => {
  const dispatch = useDispatch();

  // const location = useLocation();
  const closeModalSearch = useRef();

  const [modalShows, setModalShows] = useState(false);
  const [modalMovies, setModalMovies] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);
  // const [searchMovies, setSearchMovies] = useState("")

  const searchMovies = useSelector((store) => store.moviesState.searchMovies);
  const searchedMovies = useSelector(
    (store) => store.moviesState.searchedMovies
  );
  const loadingSearchedMovies = useSelector(
    (store) => store.moviesState.loadingSearchedMovies
  );

  useEffect(() => {
    dispatch(getSearchedMovies(searchMovies));
  }, [dispatch, searchMovies]);

  return (
    <>
      <div className={`${styles.layout}`}>
        <header className={styles.header}>
          <div className={styles.header_block}>
            <div className={styles.for_logo}>
              <Link to={``}>
                <img src={logoHeader} alt="" />
              </Link>
            </div>
            <nav className={styles.navigation}>
              <ul className={styles.lists}>
                <li>
                  <button
                    className={styles.btn_shows}
                    onMouseOver={() => {
                      setModalShows(true);
                      setModalMovies(false);
                    }}
                  >
                    Shows
                  </button>
                  {modalShows ? (
                    <div
                      className={styles.shows}
                      onMouseLeave={() => {
                        setModalMovies(false);
                        setModalShows(false);
                      }}
                    >
                      <div className={`${styles.filter_block}`}>
                        <div className={`${styles.block_filter_genres}`}>
                          <h1>Genre</h1>
                          <ul className={`${styles.filter_genres}`}>
                            <li>
                              <Link to={`movies/action`}>Action</Link>
                            </li>
                            <li>
                              <Link to={`movies/drama`}>Drama</Link>
                            </li>
                            <li>
                              <Link to={`movies/horror`}>Horror</Link>
                            </li>
                            <li>
                              <Link to={`movies/comedy`}>Comedy</Link>
                            </li>
                          </ul>
                        </div>
                        <div className={`${styles.block_filter_by_year}`}>
                          <h1>By Year</h1>
                          <ul className={`${styles.filter_by_year}`}>
                            <li>
                              <Link to={`moviesByYear/2020`}>2020</Link>
                            </li>
                            <li>
                              <Link to={`moviesByYear/2021`}>2021</Link>
                            </li>
                            <li>
                              <Link to={`moviesByYear/2022`}>2022</Link>
                            </li>
                            <li>
                              <Link to={`moviesByYear/2023`}>2023</Link>
                            </li>
                            {/* <li>
                              <Link to={``}>2024</Link>
                            </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </li>
                <li>
                  <Link to={`/movies`}>Movies</Link>
                </li>
                {/* <li>
                    <button></button>
                  </li> */}
              </ul>
            </nav>
            <div className={`${styles.block_3_header}`}>
              <div className={`${styles.for_inp_search}`}>
                <input
                  type="search"
                  name=""
                  id=""
                  placeholder="Search everything"
                  value={searchMovies}
                  onChange={(event) => {
                    dispatch(setSearchMovies(event.target.value));
                  }}
                  onFocus={() => {
                    setModalSearch(true);
                  }}
                />
                <button>
                  <TfiSearch className={`${styles.search_icon}`} />
                </button>
              </div>
              <div className={`${styles.for_profile}`}>
                <img src="" alt="" />
              </div>
            </div>
          </div>
          {modalSearch ? (
            <div
              className={`${styles.block_modal_search}`}
              ref={closeModalSearch}
              onClick={(event) => {
                if (event.target === closeModalSearch.current) {
                  setModalSearch(false);
                }
              }}
            >
              <div className={styles.modal_search}>
                {loadingSearchedMovies === false && searchMovies === "" ? (
                  <div className={`${styles.searching_movies_block}`}>
                    <h1>You need to search first</h1>
                  </div>
                ) : loadingSearchedMovies ? (
                  <div className={`${styles.loading_block_searched_movies}`}>
                    <h1>Loading...</h1>
                  </div>
                ) : (
                  searchedMovies.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className={`${styles.each_searched_movies}`}
                      >
                        <h4>{item.name}</h4>
                      </div>
                    );
                  })
                )}

                {searchedMovies.length === 0 &&
                  loadingSearchedMovies === false && (
                    <div
                      className={`${styles.not_found_block_searched_movies}`}
                    >
                      <h1>Movies not found</h1>
                    </div>
                  )}
              </div>
            </div>
          ) : null}
        </header>
        <Outlet />
        <footer className={styles.footer}></footer>
      </div>
    </>
  );
};

export default Layout;
