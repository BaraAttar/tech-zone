"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

import { Toaster, toast } from "sonner";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "@/redux/slices/user/user.AsyncThunk";
import { cleaner } from "@/redux/slices/user/userSlice";


export default function Page() {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.user);


    function submit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        // Regex patterns
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const nameRegex = /^[a-zA-Z]+$/; // Only letters
        const userNameRegex = /^[a-zA-Z0-9._-]{6,}$/; // At least 3 characters (letters, digits, _, -)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least one letter and one number

        // Validations
        if (!emailRegex.test(email)) {
            toast.error("Invalid email", { position: "top-center" });
            return;
        }

        if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            toast.error("Name must contain only letters", {
                position: "top-center",
            });
            return;
        }

        if (!userNameRegex.test(userName)) {
            toast.error(
                "Username must be at least 6 characters long and can include letters, numbers, underscores, or hyphens",
                {
                    position: "top-center",
                }
            );
            return;
        }

        if (!passwordRegex.test(password)) {
            toast.error("Password must be 8+ characters with letters and numbers", {
                position: "top-center",
            });
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords don’t match", { position: "top-center" });
            return;
        }

        if (
            !firstName ||
            !lastName ||
            !userName ||
            !phoneNumber ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            toast.error("All fields are required", { position: "top-center" });
            return;
        }

        dispatch(signup({ firstName, lastName, userName, phoneNumber, email, password, confirmPassword }))
    }

    useEffect(() => {
        if (error) {
            console.log(error)
            toast.error(error, { position: "top-center" });
        }
        if (loading === "succeeded") {
            router.push("/");
            router.refresh();
        }
        return () => {
            dispatch(cleaner())
            toast.dismiss();
        };
    }, [loading, error, router , dispatch]);

    return (
        <>
            <Toaster />
            <form className={styles.form}>
                <h3 className={styles.h3}>Create a new account</h3>
                <div className={styles.fullname_field}>
                    <div>
                        <label className={styles.label} htmlFor="firstName">
                            First name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            required
                            className={styles.input}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className={styles.label} htmlFor="lastName">
                            Last name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            required
                            className={styles.input}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <label className={styles.label} htmlFor="username">
                    User Name
                </label>
                <input
                    type="text"
                    name="username"
                    required
                    className={styles.input}
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label className={styles.label} htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    required
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className={styles.label} htmlFor="phone number">
                    phoneNumber
                </label>
                <input
                    type="tel"
                    name="phoneNumber"
                    className={styles.input}
                    value={phoneNumber}
                    onChange={(e) => setphoneNumber(e.target.value)}
                />

                <label className={styles.label} htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    required
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label className={styles.label} htmlFor="confirmPassword">
                    Repeat Password
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    required
                    className={styles.input}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div style={{marginTop : "20px"}}>
                <p className={loading === "pending" ? styles.loader : ""}></p>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        onClick={submit}
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </>
    );
}
