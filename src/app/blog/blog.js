"use client";
import React, { useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import moment from "moment";
import useSWR from "swr";
import axios from "axios";
// async function getData() {
//   try {
//     const res = await fetch("http://127.0.0.1:3000/api/posts", {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch data");
//     }

//     return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// }

const Blog = () => {
  const { data, error } = useSWR("fetchAllItems", fetchAllItems);

  async function fetchAllItems() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    console.log(data);
    return data;
  }
  // const fetcher = (url) => axios.get(url).then((res) => res.data);
  // const { data, error } = useSWR("http://127.0.0.1:3000/api/posts", fetcher);

  return (
    <div className={styles.mainContainer}>
      {data?.map((item) => (
        <div key={item.id}>
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
