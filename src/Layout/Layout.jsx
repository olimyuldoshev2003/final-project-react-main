import React, { useRef, useState } from "react";
import styles from "./Layout.module.css";
import { Link, Outlet, useLocation } from "react-router-dom";

//for React icons
import { TfiSearch } from "react-icons/tfi";

//for images
import logoHeader from "../assets/logoHeader.jpg";
import { useSelector } from "react-redux";

const Layout = () => {
  const location = useLocation();

  const [modalShows, setModalShows] = useState(false);
  const [modalMovies, setModalMovies] = useState(false);

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
                              <Link to={`movies/2020`}>2020</Link>
                            </li>
                            <li>
                              <Link to={`movies/2021`}>2021</Link>
                            </li>
                            <li>
                              <Link to={`movies/2022`}>2022</Link>
                            </li>
                            <li>
                              <Link to={`movies/2023`}>2023</Link>
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
                  <button
                    className={styles.btn_movies}
                    onMouseOver={() => {
                      setModalMovies(true);
                      setModalShows(false);
                    }}
                  ></button>
                  {modalMovies ? (
                    <div
                      className={styles.movies}
                      onMouseLeave={() => {
                        setModalMovies(false);
                        setModalShows(false);
                      }}
                    ></div>
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
        </header>
        <Outlet />
        <footer className={styles.footer}></footer>
      </div>
    </>
  );
};

export default Layout;
