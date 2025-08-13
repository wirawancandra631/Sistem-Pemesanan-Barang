import { useState, useEffect } from "react";
import {
    FeedBackSuccessComponent,
    FeedBackErrorComponent,
} from "../../components/reusable/FeedBackComponent";
import { axiosAuth, BASEURLCUSTOMER } from "./baseUrl";
export function useFetchCustomer() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const res = await axiosAuth.get(BASEURLCUSTOMER);
            const { data } = await res;
            setData(data.data)
        } catch (m) {
            setError(m.message);
            FeedBackErrorComponent(m.message);
        } finally {
            setLoading(false);
        }
    };

    const searchData = async (keyword) => {
        try {
            const res = await axiosAuth.get(`${BASEURLCUSTOMER}/search?keyword=${keyword}`);
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
        searchData
    }
}
export function useDeleteCustomer() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const deleteData = async id => {
        try {
            setLoading(true);
            await axiosAuth.delete(`${BASEURLCUSTOMER}/${id}`);
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
