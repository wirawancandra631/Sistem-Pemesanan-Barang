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

    const fetchData = async (url = BASEURLCUSTOMER) => {
        try {
            const res = await axiosAuth.get(url);
            const { data } = await res.data;
            setData(data)
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
            setData(data)
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
export function useUpdateCustomer() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const updateData = async data => {
        try {
            setLoading(true);
            await axiosAuth.put(`${BASEURLCUSTOMER}`, data);
            FeedBackSuccessComponent("Data diperbarui")
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
        updateData
    }
}
export function useImportCustomer() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const postData = async (data, onSuccess, onFailed) => {
        try {
            setLoading(true);
            await axiosAuth.post(`${BASEURLCUSTOMER}/import`, data);
            onSuccess()
        }
        catch (m) {
            setError(m.message);
            onFailed()
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
export function useSyncCustomer() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const postData = async (data, onSuccess, onFailed) => {
        try {
            setLoading(true);
            await axiosAuth.post(`${BASEURLCUSTOMER}/sync`, data);
            onSuccess()
        }
        catch (m) {
            setError(m.message);
            onFailed()
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
export function useExportCustomer() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([])
    const fetchExportData = async () => {
        try {
            setLoading(true);
            const res = await axiosAuth.get(`${BASEURLCUSTOMER}/export`);
            const { data } = await res;
            setData(data.data)
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
        fetchExportData,
        data
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

