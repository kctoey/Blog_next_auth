import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import moment from "moment";
async function getData() {
  const res = await fetch(process.env.NEXTAUTH_URL + "/api/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Blog = async () => {
  const data = await getData();
  return (
    <div className={styles.mainContainer}>
      {data?.map((item) => (
        <div key={item._id}>
          <div className={styles.imageContainer}>
            <Image
              src={item.img}
              alt=""
              width={400}
              height={250}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.username}</p>
            <p className={styles.desc}>{item.desc}</p>
            <p>{moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
