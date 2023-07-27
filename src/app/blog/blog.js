import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
const moment = require("moment");
async function getData() {
  const res = await fetch("http://127.0.0.1:3000/api/posts");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  for (const post of data) {
    const createdAt = post.createdAt;
    const formattedTime = moment(createdAt).format("YYYY-MM-DD HH:mm:ss");

    console.log("Post created at:", formattedTime);
  }
  return data;
}

const Blog = async () => {
  const data = await getData();
  return (
    <div className={styles.mainContainer}>
      {data.map((item) => (
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
