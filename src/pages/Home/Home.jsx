import axios from "axios";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);

  async function getMovies() {
    try {
      const { data } = await axios.get("http://localhost:3000/movies");
      console.log(data);
      setData(data);
    } catch (error) {}
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <div className={styles.container}>
        {data.map((item) => {
          return (
            <div>
              <video src={item.movie} width={200} height={200} controls></video>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
