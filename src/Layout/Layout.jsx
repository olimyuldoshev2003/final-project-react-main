import React from "react";
import styles from "./Layout.module.css";
import { Link, Outlet } from "react-router-dom";

//for React icons
import { TfiSearch } from "react-icons/tfi";

//for images
import logoHeader from "../assets/logoHeader.jpg";

const Layout = () => {
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
                    <button className={styles.btn_genres}>Genres</button>
                    <div className={styles.genres}></div>
                  </li>
                  <li>
                    <button className={styles.btn_movies}>Movies</button>
                    <div className={styles.movies}></div>
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
