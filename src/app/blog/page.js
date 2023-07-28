import React from "react";
import Blog from "./blog";
export const metadata = {
  title: "Blog",
  description: "Blog Content",
};

export const getStaticProps = async () => {
  const res = await fetch(process.env.NEXTAUTH_URL + "api/post2", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};
export default function Page({ data }) {
  return (
    <div>
      <Blog data={data} />
    </div>
  );
}
