"use client"
import styles from "./page.module.css";
import Categories from "./components/Categories"
import Link from "next/link";

export default function Home() {

  return (
    <main className={styles.page}>
      Home
      <br></br>
      <Link href={"/login"} >login</Link>
      <Categories />
    </main>
  );
}
