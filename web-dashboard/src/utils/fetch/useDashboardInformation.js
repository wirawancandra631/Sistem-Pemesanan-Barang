import { useEffect } from "react";
import { useState } from "react";
import { axiosAuth, BASEURLDASHBOARDINFORMATION } from "./baseUrl";

export function useFetchDashboardInformation() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const res = await axiosAuth.get(BASEURLDASHBOARDINFORMATION);
            const { data } = await res;
            setData(data.data)
        }
        catch (m) {
            setError(m.message)
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return {
        loading,
        error,
        data
    }
}