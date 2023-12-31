import Image from "next/image";
import home from "../../public/home.png";
import Hero from "../../public/hero.png";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>
          Better design for your digital products.
        </h1>
        <p className={styles.desc}>
          Turning your Idea into Reality. We bring together the teams from the
          global tech industry.
        </p>
        <Button url="/work" text="See Our Works" />
      </div>
      <div className={styles.item}>
        <Image src={home} alt="" className={styles.img} />
      </div>
    </div>
  );
};
export default Home;
