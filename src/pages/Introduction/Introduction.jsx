import React from "react";
import styles from "./Introduction.module.css";
import { useNavigate } from "react-router-dom";

const Introduction = () => {

    const navigate = useNavigate()

  return (
    <>
      <div className={`${styles.page_introduction_about_website}`}>
        <div className={`${styles.main_block}`}>
          <h1>Movie Afisha</h1>
          <p>
            Embark on a cinematic journey like never before with CineGlimpse,
            your ultimate destination for movie Afisha. Dive into a world where
            every film is a story waiting to unfold, and every poster is a
            glimpse into its captivating narrative. Explore an exquisite
            collection of movie Afisha, each one a tantalizing preview of the
            cinematic wonders to come. From blockbuster sensations to hidden
            gems, our curated selection invites you to discover, dream, and
            escape into the enchanting realm of cinema. Let CineGlimpse be your
            guide as you navigate the rich tapestry of films waiting to be
            explored. Welcome to a universe where every poster tells a tale, and
            every Afisha ignites the imagination.
          </p>
          <div className={`${styles.for_btn}`}>
                      <button onClick={() => {
                          navigate("/signin")
            }}>Join</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Introduction;
