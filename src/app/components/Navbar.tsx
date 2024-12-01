"use client";
import Link from "next/link";
import styles from "./styles/Navbar.module.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cleaner, logout } from "@/redux/slices/user/userSlice";
import { restoreUser } from "@/redux/slices/user/user.AsyncThunk";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useMemo, useState } from "react";
import { toast, Toaster } from "sonner";

// Icons
import searchIcon from "@/assets/search.svg";
import cartIcon from "@/assets/cart.svg";
import heartIcon from "@/assets/heart.svg";

export default function Navbar() {
    const [isMounted, setIsMounted] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();
    const authPages = ["/login", "/signup"];

    const token = useSelector((state: RootState) => state.user.user?.token);
    const error = useSelector((state: RootState) => state.user.error);
    const isAuthenticated = useMemo(() => !!token, [token]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (token) {
            dispatch(restoreUser({ token }))
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(logout());
            dispatch(cleaner());
        }
    }, [dispatch, error]);

    const logoutHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(logout());
    };

    if (!isMounted || authPages.includes(pathname)) return null;

    return (
        <div className={styles.navbar}>
                <Toaster position="top-center" />
            <div className={styles.navbarContent}>


                {/* Logo */}
                <p className={styles.logo}>TechZone</p>

                {/* Core Navigation */}
                <div className={styles.coreNavigation}>
                    <Link href="/">Home</Link>
                    <Link href="/categories">Categories</Link>
                    <Link href="/products">Products</Link>
                </div>

                {/* Search Input */}
                <div className={styles.searchInputWrap}>
                    <div className={styles.searchIcon}>
                        <Image alt="icon" src={searchIcon} height={20} width={20} />
                    </div>
                    <div className={styles.searchForm}>
                        <input
                            placeholder="Search..."
                            className={styles.searchInput}
                        />
                    </div>
                </div>

                {/* User Options */}
                {!isAuthenticated ? (
                    <div className={styles.loggedOutOptions}>
                        <Link href="/login" className={styles.login}>
                            Log In
                        </Link>
                        <Link href="/signup" className={styles.signup}>
                            Sign Up
                        </Link>
                    </div>
                ) : (
                    <div className={styles.isAuthenticatedOptions}>
                        <Image
                            className={styles.cart}
                            alt="Favorites"
                            src={heartIcon}
                            height={25}
                            width={25}
                        />
                        <Link href="/cart">
                            <Image
                                className={styles.cart}
                                alt="cart"
                                src={cartIcon}
                                height={25}
                                width={25}
                            />
                        </Link>
                        <div onClick={logoutHandler} className={styles.logout}>
                            Log Out
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
