"use client";
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import moment from "moment";
import axios from "axios";
import useSWR from "swr";
import Link from "next/link";

const Blog = () => {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR("/api/posts", fetcher);

  return (
    <div className={styles.mainContainer}>
      {data?.map((item) => (
        <Link
          href={`/blog/${item._id}`}
          className={styles.container}
          key={item.id}
        >
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
        </Link>
      ))}
    </div>
  );
};

export default Blog;
