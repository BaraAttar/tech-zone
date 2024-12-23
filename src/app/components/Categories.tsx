import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import styles from "./styles/Categories.module.css";
import { useEffect } from "react";
import { getCategories } from "@/redux/slices/categories/categories.AsyncThunk";
import { Toaster, toast } from 'sonner'
import Image from "next/image";

const img = "https://res.cloudinary.com/dkvauszbh/image/upload/v1732022445/mobile-app_sktsxu.png"

export default function Categories() {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading, error } = useSelector((state: RootState) => state.category);

    useEffect(() => {
        dispatch(getCategories());
        if (error) {
            toast.error(error)
        }
    }, [dispatch, error]);

    return (
        <div className={styles.categories}>
            <Toaster position="top-center" />
            <h1>Browse By Category</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className={styles.categoriesList}>
                {categories?.map((category) => (
                    <div key={category.name} className={styles.categoryCard}>
                        <div className={styles.imageContainer}>
                            <Image alt="image" src={img} width={100} height={100} />
                        </div>
                        <p>
                            {category.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
