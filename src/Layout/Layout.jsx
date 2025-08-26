import React, { useEffect, useRef, useState } from "react";
import styles from "./Layout.module.css";
import { Link, Outlet, useLocation } from "react-router-dom";

//for React icons
import { TfiSearch } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa";

//Material Icons
import MenuIcon from "@mui/icons-material/Menu";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";

//for images
import logoHeader from "../assets/logoHeader.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setSearchMovies } from "../reducers/moviesState/moviesState";
import { getSearchedMovies } from "../api/api";
import { Box, Drawer } from "@mui/material";

const Layout = () => {
  const dispatch = useDispatch();

  // const location = useLocation();
  const closeModalSearch = useRef();

  const [modalShows, setModalShows] = useState(false);
  const [modalMovies, setModalMovies] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);
  const [filterMovies, setFilterMovies] = useState(false);

  const searchMovies = useSelector((store) => store.moviesState.searchMovies);
  const searchedMovies = useSelector(
    (store) => store.moviesState.searchedMovies
  );
  const loadingSearchedMovies = useSelector(
    (store) => store.moviesState.loadingSearchedMovies
  );

  //Drawer
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
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
      className={`${styles.drawer_mobile_size}`}
    >
      <div className={`${styles.menu_mobile_size}`}>
        <div className={styles.for_logo_mobile_size}>
          <Link
            to={`/`}
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
            <img src={logoHeader} alt="" />
          </Link>
        </div>
        <nav className={`${styles.navigation_mobile_size}`}>
          <ul className={`${styles.lists_mobile_size}`}>
            <li>
              <button
                className={styles.btn_shows}
                onClick={() => {
                  setFilterMovies(!filterMovies);
                }}
              >
                Shows{" "}
                <FaAngleDown
                  style={{
                    transform: filterMovies ? `rotate(180deg)` : `rotate(0deg)`,
                    transition: `0.4s`,
                  }}
                />
              </button>
              <div
                className={`${styles.filter_block_mobile_size}`}
                style={filterMovies ? {} : { display: `none` }}
              >
                <div className={`${styles.block_filter_genres_mobile_size}`}>
                  <h1>Genre</h1>
                  <ul className={`${styles.filter_genres_mobile_size}`}>
                    <li>
                      <Link
                        to={`movies/action`}
                        onClick={toggleDrawer(anchor, false)}
                        onKeyDown={toggleDrawer(anchor, false)}
                      >
                        Action
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`movies/drama`}
                        onClick={toggleDrawer(anchor, false)}
                        onKeyDown={toggleDrawer(anchor, false)}
                      >
                        Drama
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`movies/horror`}
                        onClick={toggleDrawer(anchor, false)}
                        onKeyDown={toggleDrawer(anchor, false)}
                      >
                        Horror
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`movies/comedy`}
                        onClick={toggleDrawer(anchor, false)}
                        onKeyDown={toggleDrawer(anchor, false)}
                      >
                        Comedy
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className={`${styles.block_filter_by_year_mobile_size}`}>
                  <h1>By Year</h1>
                  <ul className={`${styles.filter_by_year_mobile_size}`}>
                    <li>
                      <Link
                        to={`moviesByYear/2020`}
                        onClick={toggleDrawer(anchor, false)}
                        onKeyDown={toggleDrawer(anchor, false)}
                      >
                        2020
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`moviesByYear/2021`}
                        onClick={toggleDrawer(anchor, false)}
                        onKeyDown={toggleDrawer(anchor, false)}
                      >
                        2021
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`moviesByYear/2022`}
                        onClick={toggleDrawer(anchor, false)}
                        onKeyDown={toggleDrawer(anchor, false)}
                      >
                        2022
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`moviesByYear/2023`}
                        onClick={toggleDrawer(anchor, false)}
                        onKeyDown={toggleDrawer(anchor, false)}
                      >
                        2023
                      </Link>
                    </li>
                    {/* <li>
                              <Link to={`#`}>2024</Link>
                            </li> */}
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <Link
                to={`/movies`}
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                to={`/favoriteMovies`}
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
              >
                Favorite
              </Link>
            </li>
            <li>
              <Link
                to={`/savedMovies`}
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
              >
                Saved
              </Link>
            </li>
            <li>
              <Link
                to={`/profile`}
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </Box>
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
              <Link to={`/`}>
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
                              <Link to={`#`}>2024</Link>
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
                <li>
                  <Link to={`/favoriteMovies`}>Favorite</Link>
                </li>
                <li>
                  <Link to={`/savedMovies`}>Saved</Link>
                </li>
                <li>
                  <Link to={`/profile`}>Profile</Link>
                </li>
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
              {/* <div className={`${styles.for_profile}`}>
                <img src="" alt="" />
              </div> */}

              <div className={`${styles.for_mobile_size}`}>
                {["left"].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <MenuIcon onClick={toggleDrawer(anchor, true)} />
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
            </div>
          </div>
        </header>
        <div className={`${styles.search_mobile_size}`}>
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
        {modalSearch ? (
          <div
            className={`${styles.block_modal_search}`}
            ref={closeModalSearch}
            onClick={(event) => {
              if (event.target === closeModalSearch.current) {
                setModalSearch(false);
                dispatch(setSearchMovies(""));
              }
            }}
          >
            <div
              className={styles.modal_search}
              style={
                loadingSearchedMovies === false && searchMovies === ""
                  ? { display: `none` }
                  : { display: `block` }
              }
            >
              {loadingSearchedMovies === false && searchMovies === "" ? (
                <div className={`${styles.searching_movies_block}`}>
                  <h1>You need to search first</h1>
                </div>
              ) : loadingSearchedMovies ? (
                <div className={`${styles.loading_block_searched_movies}`}>
                  <h1>Loading...</h1>
                </div>
              ) : (
                <div className={`${styles.searched_movies}`}>
                  <div className={`${styles.for_h1_modal_search_each_items}`}>
                    <h1>May be you're looking for:</h1>
                    <h4>Movies</h4>
                  </div>
                  <div className={`${styles.block_searched_movies}`}>
                    {searchedMovies
                      .filter((item) => {
                        return item.movie
                          .toLowerCase()
                          .includes(searchMovies.trim().toLowerCase());
                      })
                      .map((item) => {
                        return (
                          <Link
                            to={`/eachMovies/${item.id}`}
                            onClick={() => {
                              modalSearch(false);
                            }}
                          >
                            <div
                              key={item.id}
                              className={`${styles.each_searched_movies}`}
                            >
                              <h4>{item.name}</h4>
                              <h4>Rating: {item.imdbRating}</h4>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              )}

              {searchedMovies.length === 0 &&
                loadingSearchedMovies === false && (
                  <div className={`${styles.not_found_block_searched_movies}`}>
                    <h1>Movies not found</h1>
                  </div>
                )}
            </div>
          </div>
        ) : null}
        <Outlet />
        <footer className={styles.footer}>
          <div className={`${styles.main_block_footer}`}>
            <div className={styles.block_1_footer}>
              <img src={logoHeader} alt="" />
              <div className={`${styles.for_icons_footer}`}>
                <Link to={`https://www.instagram.com/`}>
                  <InstagramIcon />
                </Link>
                <Link to={`https://www.facebook.com/`}>
                  <FacebookIcon />
                </Link>
                <Link to={`#`}>
                  <TelegramIcon />
                </Link>
              </div>
              <h2>Best TV show tracker © 2024</h2>
            </div>
            <div className={`${styles.block_2_footer}`}>
              <h3>Genre</h3>
              <ul className={`${styles.block_links}`}>
                <li>
                  <Link to={`#`}>Comedy</Link>
                </li>
                <li>
                  <Link to={`#`}>Action</Link>
                </li>
                <li>
                  <Link to={`#`}>Thriller</Link>
                </li>
                <li>
                  <Link to={`#`}>Horror</Link>
                </li>
                <li>
                  <Link to={`#`}>Animation</Link>
                </li>
              </ul>
            </div>
            <div
              className={`${styles.block_3_footer} ${styles.block_2_footer}`}
            >
              <h3>Community</h3>
              <ul className={`${styles.block_links}`}>
                <li>
                  <Link to={`#`}>Friends</Link>
                </li>
                <li>
                  <Link to={`#`}>Movies discussion</Link>
                </li>
                <li>
                  <Link to={`#`}>TV shows discussion</Link>
                </li>
                <li>
                  <Link to={`#`}>Join</Link>
                </li>
              </ul>
            </div>
            <div
              className={`${styles.block_4_footer} ${styles.block_2_footer}`}
            >
              <h3>News</h3>
              <ul className={`${styles.block_links}`}>
                <li>
                  <Link to={`#`}>Announcements</Link>
                </li>
                <li>
                  <Link to={`#`}>Trailers</Link>
                </li>
                <li>
                  <Link to={`#`}>Compilations</Link>
                </li>
                <li>
                  <Link to={`#`}>Articles</Link>
                </li>
                <li>
                  <Link to={`#`}>Movies</Link>
                </li>
              </ul>
            </div>
          </div>
          <h2></h2>
        </footer>
      </div>
    </>
  );
};

export default Layout;
