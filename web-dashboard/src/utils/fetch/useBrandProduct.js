import { useEffect, useState } from "react";
import { axiosAuth, BASEURLBRANDPRODUCT } from "./baseUrl";
import {
    FeedBackErrorComponent,
    FeedBackSuccessComponent,
} from "../../components/reusable/FeedBackComponent";
export function useFetchBrandProduct() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const res = await axiosAuth.get(BASEURLBRANDPRODUCT);
            const { data } = await res;
            setData(data.data);
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
        data,
        loading,
        error,
        fetchData,
    };
}
export function usePostBrandProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const postData = async (data, onSuccess) => {
        try {
            setLoading(true);
            await axiosAuth.post(BASEURLBRANDPRODUCT, data);
            onSuccess();
            FeedBackSuccessComponent("Data ditambahkan");
        } catch (m) {
            setError(m.message);
            FeedBackErrorComponent(m.message);
        } finally {
            setLoading(false);
        }
    };
    return {
        loading,
        error,
        postData,
    };
}
export function useEditBrandProduct(opened, id) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const editData = async () => {
        try {
            setLoading(true);
            const res = await axiosAuth.get(`${BASEURLBRANDPRODUCT}/edit/${id}`);
            const { data } = await res;
            setData(data.data)
        } catch (m) {
            setError(m.message);
            FeedBackErrorComponent(m.message)
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (opened && id) {
            editData()
        }
    }, [opened, id])
    return {
        data,
        loading,
        error,
        editData,
    };
}
export function useUpdateBrandProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const updateData = async (id, data) => {
        try {
            setLoading(true);
            await axiosAuth.put(`${BASEURLBRANDPRODUCT}/${id}`, data)
            FeedBackSuccessComponent("Data diperbarui")
        } catch (m) {
            setError(m.message);
            FeedBackErrorComponent(m.message)
        } finally {
            setLoading(false);
        }
    };
    return {
        loading,
        error,
        updateData,
    };
}
export function useDeleteBrandProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const deleteData = async (id) => {
        try {
            setLoading(true);
            await axiosAuth.delete(BASEURLBRANDPRODUCT + "/" + id);
            FeedBackSuccessComponent("Data dihapus");
        } catch (m) {
            setError(m.message);
            FeedBackErrorComponent(m.message);
        } finally {
            setLoading(false);
        }
    };
    return {
        loading,
        error,
        deleteData,
    };
}
