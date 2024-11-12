"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { login } from "@/redux/slices/user/user.AsyncThunk";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { Toaster, toast } from "sonner";
import { cleaner } from "@/redux/slices/user/userSlice";

export default function Login() {
  const [userName, setUserName] = useState("admin");
  const [password, setPassword] = useState("12345678");

  const dispatch = useDispatch<AppDispatch>()
  const { user, loading, error } = useSelector((state: RootState) => state.user);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(login({ userName, password }))
  }

  useEffect(() => {
    const token = getCookie('token')
    if (token) {
      redirect("/")
    }
    if (error) {
      toast.error(error, { position: "top-center" });
    }
    return () => {
      dispatch(cleaner())
      toast.dismiss();
    };
  }, [user, loading, error , dispatch])

  return (
    <>
      <form className={styles.form} onSubmit={submit}>
        <Toaster />
        <h3 className={styles.h3}>Log in</h3>
        <label className={styles.label} htmlFor="email">
          user name
        </label>
        <input
          type="text"
          id="text"
          name="text"
          placeholder="userName"
          required
          className={styles.input}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <label className={styles.label} htmlFor="password">
          password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>forget the password ?</p>
        <div>
          <p className={loading === "pending" ? styles.loader : ""}></p>
          <button
            type="submit"
            className={styles.submitButton}
          >
            login
          </button>
        </div>
        <Link className={styles.link} href="/signup">Create a new account</Link>
      </form>
    </>
  );
}
