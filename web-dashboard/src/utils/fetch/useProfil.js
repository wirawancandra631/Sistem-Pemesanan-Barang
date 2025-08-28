import { useState, useEffect } from "react";
import { axiosAuth, BASEURLUSERPROFIL } from "./baseUrl";
import { FeedBackSuccessComponent, FeedBackErrorComponent } from "../../components/reusable/FeedBackComponent"
export function useFetchProfil() {
    const [data, setData] = useState(null);
    const fetchData = async () => {
        try {
            const res = await axiosAuth.get(`${BASEURLUSERPROFIL}/show`);
            const { data } = await res;
            setData(data.data)
        }
        catch (m) {
            console.log(m)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return {
        data,
        fetchData
    }
}
export const useFetchAllUserProfil = () => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const res = await axiosAuth.get(BASEURLUSERPROFIL);
            const { data } = await res;
            setData(data.data)
        }
        catch (m) {
            console.log(m)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return {
        data,
        fetchData
    }
}
export function usePostUserApp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const postData = async (data) => {
        try {
            setLoading(true)
            await axiosAuth.post(BASEURLUSERPROFIL, data);
            FeedBackSuccessComponent("Data ditambahkan")
        }
        catch (m) {
            setError(m.message)
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
export function useUpdateProfil() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const updateData = async (data) => {
        try {
            setLoading(true)
            await axiosAuth.put(BASEURLUSERPROFIL, data);
            FeedBackSuccessComponent("Profil diperbarui")
        }
        catch (m) {
            setError(m.message)
            FeedBackErrorComponent(m.message)
        }
        finally {
            setLoading(false)
        }
    }
    return {
        loading,
        error,
        updateData
    }
}
export function useDeleteUserApp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const deleteData = async (id) => {
        try {
            setLoading(true)
            await axiosAuth.delete(`${BASEURLUSERPROFIL}/${id}`);
            FeedBackSuccessComponent("Data dihapus")
        }
        catch (m) {
            setError(m.message)
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