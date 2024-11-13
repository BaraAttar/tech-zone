"use client"
import styles from "./page.module.css";
import Categories from "./components/Categories"
import Link from "next/link";
import Products from "./components/Products";

export default function Home() {

  return (
    <main className={styles.main}>
      Home
      <br></br>
      <Link href={"/login"} >login</Link>
      <Categories />
      <Products/>
    </main>
  );
}
