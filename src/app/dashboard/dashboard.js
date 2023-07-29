"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineFile, AiOutlineFileImage } from "react-icons/ai";

import Image from "next/image";
import { ImBin } from "react-icons/im";
export const metadata = {
  title: "Dashboard",
  description: "Dashboard Information",
};

const Dashboard = () => {
  const CLOUD_NAME = "dusruvngy";
  const UPLOAD_PRESET = "my_blog_project";
  const [photo, setPhoto] = useState("");
  // const [data, setData] = useState([]);
  // const [err, setErr] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const getData = async () => {
  //     setIsLoading(true);
  //     const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
  //       cache: "no-store",
  //     });
  //     if (!res.ok) {
  //       setErr(true);
  //     }
  //     const data = await res.json();
  //     setData(data);
  //     setIsLoading(false);
  //   };
  //   getData();
  // }, []);
  const session = useSession();
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, mutate, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );
  // console.log(session?.data?.user.name);
  if (session.status === "loading") {
    return <p>Loading</p>;
  }
  if (session.status === "unauthenticated") {
    router.push("/dashboard/login");
  }
  const uploadImage = async () => {
    if (!photo) return;

    const formData = new FormData();

    formData.append("file", photo);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      const imageUrl = data["secure_url"];

      return imageUrl;
    } catch (error) {
      console.log(error);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!photo || !title || !category || !desc) {
  //     toast.error("All fields are required");
  //     return;
  //   }

  //   try {
  //     const imageUrl = await uploadImage();

  //     const res = await fetch(`http://localhost:3000/api/blog`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${session?.user?.accessToken}`,
  //       },
  //       method: "POST",
  //       body: JSON.stringify({
  //         title,
  //         desc,
  //         category,
  //         imageUrl,
  //         authorId: session?.user?._id,
  //       }),
  //     });

  //     if (!res.ok) {
  //       throw new Error("Error occured");
  //     }

  //     const blog = await res.json();

  //     router.push(`/blog/${blog?._id}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = await uploadImage();
    const content = e.target[3].value;
    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session.data.user.name,
        }),
      });
      e.target.reset;
      mutate();
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (error) {}
  };
  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading
            ? "loading"
            : data?.map((post) => (
                <div className={styles.post} key={post._id}>
                  <div className={styles.imgContainer}>
                    <Image src={post.img} alt="" width={200} height={100} />
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <span
                    className={styles.delete}
                    onClick={() => handleDelete(post._id)}
                  >
                    {" "}
                    <ImBin />
                  </span>
                </div>
              ))}
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input
            type="text"
            placeholder="Title"
            className={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Desc"
            className={styles.input}
            required
          />
          {/* <input
            type="text"
            placeholder="Image"
            className={styles.input}
            required
          /> */}
          <label htmlFor="image">
            Upload Image <AiOutlineFileImage />
          </label>
          <input
            className={styles.input}
            id="image"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <textarea
            placeholder="Content"
            className={styles.textArea}
            cols="30"
            rows="10"
          ></textarea>
          <button className={styles.button}>Send</button>
        </form>
      </div>
    );
  }
};

export default Dashboard;
