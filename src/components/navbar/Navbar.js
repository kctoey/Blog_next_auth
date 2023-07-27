"use client";
import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Work",
    url: "/work",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];
export const Navbar = () => {
  const session = useSession();
  console.log(session?.data?.user.name);
  return (
    <div className={styles.container}>
      <Link className={styles.logo} href="/">
        Home{" "}
      </Link>
      <div className={styles.links}>
        <DarkModeToggle />
        {links.map((item) => (
          <Link key={item.id} href={item.url} className={styles.links}>
            {item.title}
          </Link>
        ))}
        {session.status === "authenticated" && (
          <div>
            <p>{session?.data?.user.name}</p>
            <button className={styles.logout} onClick={signOut}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
