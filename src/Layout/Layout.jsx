import React, { useRef, useState } from "react";
import styles from "./Layout.module.css";
import { Link, Outlet } from "react-router-dom";

//for React icons
import { TfiSearch } from "react-icons/tfi";

//for images
import logoHeader from "../assets/logoHeader.jpg";
import { useSelector } from "react-redux";

const Layout = () => {
  const movies = useSelector((store) => store.moviesState.movies);
  console.log(movies);
  const [modalGenres, setModalGenres] = useState(false);
  const [modalMovies, setModalMovies] = useState(false);

  return (
    <>
      <div className={`${styles.layout}`}>
        <header className={styles.header}>
          <div className={`${styles.container}`}>
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
                      className={styles.btn_genres}
                      onMouseOver={() => {
                        setModalGenres(true);
                        setModalMovies(false);
                      }}
                    >
                      Genres
                    </button>
                    {modalGenres ? (
                      <div
                        className={styles.genres}
                        onMouseLeave={() => {
                          setModalMovies(false);
                          setModalGenres(false);
                        }}
                      >
                        <h2>Filter by genre</h2>
                        <div className={`${styles.for_block_genres}`}>
                          {movies.map((item) => {
                            return (
                              <div key={item.id} className={styles.genre}>
                                <Link to={`${item.genre}`}>{item.genre}</Link>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}
                  </li>
                  <li>
                    <button
                      className={styles.btn_movies}
                      onMouseOver={() => {
                        setModalMovies(true);
                        setModalGenres(false);
                      }}
                    >
                      Movies
                    </button>
                    {modalMovies ? (
                      <div
                        className={styles.movies}
                        onMouseLeave={() => {
                          setModalMovies(false);
                          setModalGenres(false);
                        }}
                      >
                        <h2>Filter by movie</h2>
                        <div className={`${styles.for_block_movies}`}>
                          {movies.map((item) => {
                            return (
                              <div key={item.id} className={`${styles.movie}`}>
                                <Link to={`${item.name}`}>{item.name}</Link>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}
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
          </div>
        </header>
        <Outlet />
        <footer className={styles.footer}></footer>
      </div>
    </>
  );
};

export default Layout;
