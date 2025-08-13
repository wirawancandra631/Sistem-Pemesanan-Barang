import { useEffect, useState } from "react";
import { axiosAuth, BASEURLPRODUCTRECOMENDATION } from "./baseUrl";
import { FeedBackErrorComponent, FeedBackSuccessComponent } from "../../components/reusable/FeedBackComponent"
export function useFetchProductRecomendation() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchData = async () => {
        try {
            const res = await axiosAuth.get(BASEURLPRODUCTRECOMENDATION);
            const { data } = await res;
            setData(data.data)
        }
        catch (m) {
            setError(m.message);
        }
        finally {
            setLoading(false)
        }
    }

    const searchData = async (keyword) => {
        try {
            const res = await axiosAuth.get(`${BASEURLPRODUCTRECOMENDATION}/search?keyword=${keyword}`);
            const { data } = await res;
            setData(data.data)
        }
        catch (m) {
            setError(m.message);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    return {
        data,
        loading,
        error,
        fetchData,
        searchData
    }
}
export function usePostProductRecomendation() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const postData = async (id) => {
        try {
            setLoading(true)
            const data = {
                "id_product": id
            }
            await axiosAuth.post(BASEURLPRODUCTRECOMENDATION, data);
            FeedBackSuccessComponent("Produk direkomendasikan")
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
export function useDeleteProductRecomendation() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const deleteData = async (id) => {
        try {
            setLoading(true)
            await axiosAuth.delete(`${BASEURLPRODUCTRECOMENDATION}/${id}`);
            FeedBackSuccessComponent("Produk tidak direkomendasikan")
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
