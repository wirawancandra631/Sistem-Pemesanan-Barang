import { useState, useEffect } from "react";
import {
    FeedBackSuccessComponent,
    FeedBackErrorComponent,
} from "../../components/reusable/FeedBackComponent";
import { axiosAuth, BASEURLBANNERPROMOTION } from "./baseUrl";
export function useFetchBannerPromotion() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const res = await axiosAuth.get(BASEURLBANNERPROMOTION);
            const { data } = await res;
            setData(data.data)
        } catch (m) {
            setError(m.message);
            FeedBackErrorComponent(m.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return {
        loading,
        error,
        data,
        fetchData,
    }
}
export function usePostBannerPromotion() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const postData = async data => {
        try {
            setLoading(true);
            const formData = new FormData()
            formData.append("image_banner", data.image_banner)
            await axiosAuth.post(BASEURLBANNERPROMOTION, formData);
            FeedBackSuccessComponent("Data ditambahkan")
        }
        catch (m) {
            setError(m.message);
            FeedBackErrorComponent(m.message)
        }
        finally {
            setLoading(false)
        }
    }
    return {
        loading,
        error,
        postData
    }
}
export function useDeleteBannerPromotion() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const deleteData = async id => {
        try {
            setLoading(true);
            await axiosAuth.delete(`${BASEURLBANNERPROMOTION}/${id}`);
            FeedBackSuccessComponent("Data dihapus")
        }
        catch (m) {
            setError(m.message);
            FeedBackErrorComponent(m.message)
        }
        finally {
            setLoading(false)
        }
    }
    return {
        loading,
        error,
        deleteData
    }
}

