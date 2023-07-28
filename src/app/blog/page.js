import React from "react";
import Blog from "./blog";
export const metadata = {
  title: "Blog",
  description: "Blog Content",
};
const Page = () => {
  return (
    <div>
      <Blog />
    </div>
  );
};
export default Page;
