import { useState, useEffect } from "react";
import { axiosAuth, BASEURLUSERPROFIL } from "./baseUrl";

export function useFetchProfil() {
    const [data, setData] = useState(null);

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