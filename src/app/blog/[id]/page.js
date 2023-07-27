// import React from "react";
// import styles from "./page.module.css";
// import Image from "next/image";

// const getData = async (id) => {
//   const res = await fetch(`http://127.0.0.1:3000/api/posts/${id}`, {
//     cache: "no-store",
//   });
//   if (!res.ok) {
//     throw new Error("Fail to fetch data");
//   }

//   return res.json();
// };
// export async function generateMetadata({ params }) {
//   const data = await getData(params.id);

//   return {
//     title: data.title,
//     description: data.desc,
//   };
// }
// const BlogPost = async ({ params }) => {
//   const data = await getData(params.id);
//   return (
//     <div className={styles.container}>
//       <div className={styles.top}>
//         <div className={styles.info}>
//           <h1 className={styles.title}>{data.title}</h1>
//           <p className={styles.desc}>{data.body}</p>
//           <div className={styles.author}>
//             <Image
//               src=""
//               alt=""
//               width={40}
//               height={40}
//               className={styles.avatar}
//             />
//             <span className={styles.username}>{data.username}</span>
//           </div>
//         </div>
//         <div className={styles.imageContainer}>
//           <Image src={data.img} alt="" fill={true} className={styles.image} />
//         </div>
//       </div>
//       <div className={styles.content}>
//         <p className={styles.text}>{data.desc}</p>
//       </div>
//     </div>
//   );
// };

// export default BlogPost;
